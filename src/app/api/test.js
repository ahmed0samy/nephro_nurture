import connectToDatabase from "@/lib/utils";

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    res.status(200).json({ message: 'Connected to MongoDB!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}