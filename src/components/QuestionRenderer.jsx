import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function QuestionRenderer({ questionText }) {
  let question = questionText;
  let code = null;
  let language = "javascript"; // default

  // Detect code block
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/;
  const match = questionText.match(codeRegex);

  if (match) {
    language = match[1] || "javascript"; // e.g., "python", "cpp", etc.
    code = match[2].trim();
    question = questionText.replace(codeRegex, "").trim();
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow shadow-blue-300 space-y-4">
      <p className="text-gray-800 whitespace-pre-wrap text-base">{question}</p>

      {code && (
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{ borderRadius: "8px", fontSize: "0.9rem" }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
