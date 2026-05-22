import { useEffect } from "react";
import axios from "axios";

export default function Home() {

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-4xl">
      Brand Shoe
    </div>
  );
}