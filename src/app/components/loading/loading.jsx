import Image from "next/image";

export default function Loading() {
  return <div className="loading">
    <Image src="/loading.gif" alt="Description" width={200} height={200} />
    <h1>
     Loading...
    </h1>
     </div>;
};
