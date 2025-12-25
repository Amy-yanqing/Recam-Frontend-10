import { useEffect, useState } from "react";
import { getAllAgents } from "../apis/users.api";

export default function AgentsPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAgents();
        console.log("Response:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Agents Test Page</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
