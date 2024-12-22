import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import {
    FaMoon,
    FaSun,
    FaFolder,
    FaPython,
    FaJsSquare,
    FaHtml5,
    FaCss3Alt,
    FaFile,
    FaReact,
} from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


export default function CodeRoast() {
    const [mode, setMode] = useState("dark");
    const [repoUrl, setRepoUrl] = useState("");
    const [repoPath, setRepoPath] = useState("");
    const [pathHistory, setPathHistory] = useState([]);
    const [contents, setContents] = useState<{ sha: string; type: string; path: string; name: string; download_url?: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [fileType, setFileType] = useState("");


    const fetchRepoContents = async (path = "") => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5000/repo-content", {
                params: { repoUrl, path },
            });

            setContents(response.data);
            setRepoPath(path);
        } catch (error) {
            setError("Failed to fetch repository contents.");
            console.error("Error fetching repository contents:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFileContent = async (fileUrl: string) => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5000/file-content", {
                params: { fileUrl },
            });

            setFileContent(response.data);
            const fileExtension = fileUrl.split(".").pop() || "";
            setFileType(fileExtension);
        } catch (error) {
            setError("Failed to fetch file content.");
            console.error("Error fetching file content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = (item: { sha: string; type: string; path: string; name: string; download_url?: string }) => {
        if (item.type === "dir") {
            fetchRepoContents(item.path);
        } else if (item.type === "file") {
            if (item.download_url) {
                fetchFileContent(item.download_url);
            } else {
                setError("File URL is undefined.");
            }
        }
    };

    const handleBackClick = () => {
        if (pathHistory.length > 0) {
            const previousPath = pathHistory.pop();
            setPathHistory([...pathHistory]);
            fetchRepoContents(previousPath || "");
        }
    };


    const getFileIcon = (fileName: string) => {
        const fileExtension = fileName.split(".").pop();
        switch (fileExtension) {
            case "js":
                return <FaJsSquare color="#f0db4f" />;
            case "html":
                return <FaHtml5 color="#e34f26" />;
            case "css":
                return <FaCss3Alt color="#264de4" />;
            case "py":
                return <FaPython color="#306998" />;
            case "jsx":
                return <FaReact color="#00ffff" />;
            default:
                return <FaFile color="#777" />;
        }
    };

    return (
        <div
            className={`${mode}  text-black dark:text-white bg-white dark:bg-slate-800 max-h-screen h-[1000px] overflow-auto`}
        >
            <header>
                <nav className="flex h-20 justify-between px-8 items-center lg:mx-44">
                    <div className="text-3xl font-extrabold flex justify-center items-center">
                        COD
                        <span className="text-s1 font-sans">MINATI</span>
                    </div>
                    <div className="flex gap-2">
                        {/* <ul className="hidden lg:flex gap-2 mt-1"> */}
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setMode(mode === "dark" ? "light" : "dark");
                            }}
                        >
                            {mode === "dark" ? <FaSun /> : <FaMoon />}
                        </Button>
                        <Menubar className="rounded-lg">
                            <MenubarMenu>
                                <MenubarTrigger>Dashboard</MenubarTrigger>
                                <MenubarContent
                                    className={`${mode} text-black dark:text-white bg-white dark:bg-slate-800`}
                                >
                                    <MenubarItem>Visit</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Flame Mode</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>CodeRoast</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Logout</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </nav>
            </header>
            <main className="px-8 lg:mx-44">
                <section className="text-center w-full">
                    <h1 className="text-3xl font-extrabold font-mono">CodeRoast❤️‍🔥🔥</h1>
                    <h3 className="text-sm mt-1">HERE, YOUR CODE GET ROASTED</h3>
                    <div className="w-full p-2 mt-8 flex flex-col items-end justify-end gap-2  text-center">
                        <Input
                            className="w-[300px]"
                            type="text"
                            placeholder="Enter GitHub Repository URL"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                        />
                        <Button variant="outline" onClick={() => fetchRepoContents()}>
                            Fetch Repository & Review
                        </Button>
                        {error && (
                            <p className="text-center" style={{ color: "red" }}>
                                {error}
                            </p>
                        )}
                    </div>
                </section>
                <section className={`dark:text-black h-[60%] rounded-lg flex flex-col lg:flex-row overflow-auto mt-8`}>
                    <div className="lg:w-[40%] overflow-auto flex flex-col items-start p-5">
                        {/* Loading and error states */}
                        {loading && <p className="text-black dark:text-white">Loading...</p>}
                        {/* Back button for previous directory */}
                        {!loading && repoPath && (
                            <Button className="dark:text-white text-black w-auto px-2 py-3" size='icon'
                                onClick={handleBackClick}
                            >
                                🔙 Back
                            </Button>
                        )}                        {/* Display contents of the directory */}
                        {!loading && contents.length > 0 && (
                            <div>
                                <h2 className="text-[#1abc9c] font-bold text-2xl mb-6"
                                >
                                    Contents of:{" "}
                                    <span className="text-[#3498db]">{repoPath || "root"}</span>
                                </h2>
                                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                                    {contents.map((item) => (
                                        <li className=" text-black dark:text-white cursor-pointer flex"
                                            key={item.sha}
                                            style={{
                                                marginBottom: "15px",
                                                fontSize: "18px",
                                                // color: item.type === "dir" ? "#2ecc71" : "#ecf0f1",
                                            }}
                                            onClick={() => handleItemClick(item)}
                                        >
                                            {item.type === "dir" ? (
                                                <FaFolder size={24} color="#2ecc71" />
                                            ) : (
                                                getFileIcon(item.name)
                                            )}
                                            <span style={{ marginLeft: "10px", fontSize: "18px" }}>
                                                {item.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}{" "}
                    </div>
                    <div className="lg:w-[60%] overflow-auto max-h-[600px] h-full bg-[#34495e] p-3 text-[12px] lg:text-md rounded-xl text-[#ecf0f1] shadow-lg">
                        {/* Display file content with syntax highlighting */}
                        {fileContent && (
                            <div className="">
                                <h2 className="">File Content:</h2>
                                <SyntaxHighlighter
                                    language={fileType}
                                    style={dracula}
                                    showLineNumbers
                                    wrapLines>
                                    {fileContent}
                                </SyntaxHighlighter>
                            </div>
                        )}
                    </div>
                </section>
                <section className="h-screen mt-4">Here the comment section will be!</section>
            </main>
        </div>
    );
}
