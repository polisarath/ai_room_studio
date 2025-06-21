import axios from "axios";

export default async function handler(req, res) {
  const { url, filename = "download.png" } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing image URL" });
  }

  try {
    const imageResponse = await axios.get(url, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.status(200).send(Buffer.from(imageResponse.data, "binary"));
  } catch (error) {
    console.error("Download failed:", error.message);
    res.status(500).json({ error: "Failed to download image" });
  }
}
