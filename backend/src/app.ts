import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const token = process.env.token || "";

const GITHUB_API_BASE_URL = "https://api.github.com";

app.get("/repo-content", async (req: Request, res: Response): Promise<any> => {
  const { repoUrl, path } = req.query;

  if (!repoUrl || typeof repoUrl !== "string") {
    return res
      .status(400)
      .send({ error: "Repository URL is required and must be a string" });
  }
  const parts = repoUrl.split("/");
  // console.log(parts);

  if (!(parts && parts.length >= 5)) {
    return res.status(400).send({ error: "Invalid GitHub repository URL" });
  }
  const owner = parts[3];
  const repo = parts[4];
  const url = `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${
    path || ""
  }`;
  // console.log(url, owner, repo);
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(url, { headers });
    // console.log(response);
    return res.send(response.data);
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .send({ error: "Failed to fetch repository content" });
  }
});


app.get("/file-content", async (req: Request, res: Response): Promise<any> => {
  const { fileUrl } = req.query;
  console.log("FileUrl" + fileUrl);

  if (!fileUrl) {
    return res.status(400).send({ error: "File URL is required" });
  }

  try {
    const response = await axios.get(fileUrl as string, {
      headers: {
        Accept: "application/vnd.github.v3.raw", // Fetch raw file content
      },
    });
    res.send(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching file content:",
      error.response?.data || error.message
    );

    if (error.response) {
      return res.status(error.response.status).send(error.response.data);
    }
    res.status(500).send({ error: "Failed to fetch file content" });
  }
});



app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
