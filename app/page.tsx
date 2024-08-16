import VideoGenerator from "./components/VideoGenerator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">AI Video Generator</h1>
      <VideoGenerator />
    </div>
  )
}