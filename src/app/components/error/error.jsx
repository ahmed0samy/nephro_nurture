import Image from "next/image";

export default function ErrorScreen({ msg, heading }) {
  return (
    <div className="loading">
      <Image src="/error.gif" alt="Description" width={50} height={50} />
      <h1>{heading}</h1>
      {msg}
    </div>
  );
}
