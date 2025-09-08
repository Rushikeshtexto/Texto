import React from "react";
import "./list.css"

const List=()=>{
    
    return(


            <div className="segments-section">
              <h2>List & Segments</h2>
              <input
                type="text"
                placeholder="🔍 Search segments..."
                className="segments-search"
              />
              <div className="segments-buttons">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("file", file);
                    try {
                      const res = await fetch("http://localhost:5000/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();
                      console.log("✅ Upload response:", data);
                    } catch (err) {
                      console.error("❌ Error uploading file:", err);
                      alert("Failed to upload file.");
                    }
                  }}
                />
                <button
                  className="btn add-segment"
                  onClick={() => document.getElementById("fileUpload").click()}
                >
                  Add List
                </button>
                <button className="btn add-segment"> Add Segment</button>
              </div>
            </div>
          




);


};
export default List;