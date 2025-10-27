import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import InternshipCard from "../components/InternshipCard";
import AddInternshipForm from "../components/AddInternshipForm";

function Internship() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [internships, setInternships] = useState([]);
  const [showInternship, setShowInternship] = useState(false);

  const fetchInternships = () => {
    if (user.role === "student") {
      axios
        .get("http://localhost:5000/api/internships")
        .then((res) => setInternships(res.data))
        .catch((err) => console.log(err));
    } else if (user.role === "company") {
      axios
        .get(
          `http://localhost:5000/api/company/internships?companyId=${user.id}`
        )
        .then((res) => setInternships(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div style={{ display: "flex", marginLeft: "15%" }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Internships</h1>

        {user.role === "company" && (
          <>
            {/* add internship */}
            <section>
              <button
                onClick={() => setShowInternship(!showInternship)}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                {showInternship ? "Close Internship Form" : "Add Internship"}
              </button>

              {showInternship && (
                <AddInternshipForm
                  user={user}
                  onAdded={(newInternship) =>
                    setInternships((prev) => [newInternship, ...prev])
                  }
                />
              )}
            </section>

           <section>
             <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
            {internships && internships.length > 0 ? (
                internships.filter((i) => i && i.companyId === user.id).length >
                0 ? (
                  internships
                    .filter((i) => i && i.companyId === user.id)
                    .map((i) => (
                      <InternshipCard
                        key={i._id || Math.random()}
                        internship={i}
                      />
                    ))
                ) : (
                  <p>No internships available.</p>
                )
              ) : (
                <p>No internships available.</p>
              )}
              </div>
           </section>
          </>
        )}

        {user.role === "student" && (
          <>
           <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
            {internships && internships.length > 0 ? (
              internships
                .filter((i) => i != null)
                .map((i) => (
                  <InternshipCard key={i._id || Math.random()} internship={i} />
                ))
            ) : (
              <p>No internships available.</p>
            )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Internship;
