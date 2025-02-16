import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TriadQuestion from "./TriadQuestion"; // <-- Adjust path if needed

export default function TriadParent() {
    // This will replace "QuestionList" as your default screen.
    // So, in your routes or main file, render <TriadParent /> by default.

    const [index, setIndex] = useState(0);
    const [triangleConfig, setTriangleConfig] = useState(null);
    const [isQueList, setQueList] = useState(false); // if you still need this

    // 1) Fetch your data from TRIAD_DATA.json
    const { data, isLoading, isError } = useQuery({
        queryKey: ["triadData"],
        queryFn: async () => {
            const result = await axios.get("/TRIAD_DATA.json");
            // If your JSON is an array, just map it to add qNo
            return result.data?.map((x, i) => ({ ...x, qNo: i }));
        },
    });

    // 2) Once data arrives, set up an initial triangleConfig
    useEffect(() => {
        if (data && data.length > 0 && triangleConfig === null) {
            const first = data[0];
            setTriangleConfig({
                sideText: [first.Top, first.LL, first.LR],
                triangleColor: String(first.Tcolor).toLowerCase().replace(" ", ""),
                triangleWidth: 175 * 2,
                circleColor: String(first.Pcolor).toLowerCase().replace(" ", ""),
                insideText: first.QueryName,
                question: `${first.qNo + 1}.${first.Question}`,
                que: first.Question,
                puckPos: null,
            });
        }
    }, [data, triangleConfig]);

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>Failed to load data.</div>;
    if (!data || data.length === 0) return <div>No data found.</div>;

    // 3) Render TriadQuestion with the props it needs
    return (
        <TriadQuestion
            indexState={[index, setIndex]}
            setQueList={setQueList}
            triangleConfig={triangleConfig}
            setTriangleConfig={setTriangleConfig}
            queryData={data}
            datasLength={data.length}
        />
    );
}
