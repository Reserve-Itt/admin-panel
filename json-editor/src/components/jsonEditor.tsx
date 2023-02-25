import React, { useState, ChangeEvent } from "react";

interface JsonEditorProps {
    jsonData: any;
    setJsonData: (jsonData: any) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonData, setJsonData }) => {
    const [editedData, setEditedData] = useState<any>(jsonData);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        try {
            setEditedData(JSON.parse(e.target.value));
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = () => {
        setJsonData(editedData);
    };

    return (
        <>
            <textarea value={JSON.stringify(editedData)} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default JsonEditor;
