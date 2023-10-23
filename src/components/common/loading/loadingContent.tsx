interface LoadingContentInterface {
  text?: string;
}

export function LoadingContent(props: LoadingContentInterface) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
      <h2 className="text-text text-xl font-semibold">{props?.text}</h2>
    </div>
  );
}
