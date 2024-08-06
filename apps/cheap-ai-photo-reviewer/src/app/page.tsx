'use client';
import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';
import Markdown from 'react-markdown';

export default function Chat() {
  const [encodedFiles, setEncodedFiles] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async (files) => {
      console.log('Chat page received a file');
      const getBase64 = async (file: Blob): Promise<string> => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((reslove, reject) => {
          reader.onload = () => {
            reslove(reader.result as string);
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const eFiles: string[] = [];
      for (const file of files) {
        eFiles.push(await getBase64(file));
      }
      console.log('Chat page encoded the file');
      setEncodedFiles(eFiles);
    },
  });

  const { messages, handleSubmit, isLoading } = useChat({
    body: {
      encodedFiles,
    },
  });

  useEffect(() => {
    if (
      !isLoading &&
      encodedFiles.length > 0 &&
      !messages.find(({ role }) => role !== 'user')
    ) {
      console.log('Chat page submitting the file');
      handleSubmit();
    }
  }, [isLoading, encodedFiles, messages, handleSubmit]);

  return (
    <div className="m-5 flex gap-2">
      <div className="w-1/2">
        <section className="flex flex-col gap-2 rounded-md border-2 p-5">
          {encodedFiles.length === 0 && (
            <div
              {...getRootProps({
                className: 'dropzone h-24 flex flex-col justify-center',
              })}
            >
              <input {...getInputProps()} />
              <p className="text-2xl font-bold">
                Drag &apos;n&apos; drop your photo here
              </p>
            </div>
          )}
          {encodedFiles.map((file, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="w-full" key={i} src={file} alt="An image" />
          ))}
        </section>
      </div>

      <div className="w-1/2 text-2xl">
        {isLoading ? (
          <div className="mb-5 text-2xl font-bold italic">
            Having a good look at your photo...
          </div>
        ) : null}
        {messages.map((m) => (
          <div className="whitespace-pre-wrap" key={m.id}>
            {m.role !== 'user' && <Markdown>{m.content}</Markdown>}
          </div>
        ))}
      </div>
    </div>
  );
}
