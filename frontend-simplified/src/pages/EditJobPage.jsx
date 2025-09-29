import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditJobPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // Form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const getToken = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).token : null;
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = getToken();
        const res = await fetch(`/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setJob(data);

        // Fill form with job data
        setTitle(data.title);
        setType(data.type);
        setLocation(data.location);
        setDescription(data.description);
        setSalary(data.salary);
        setCompanyName(data.company.name);
        setCompanyDescription(data.company.description);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const updateJob = async (updatedJob) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) throw new Error("Failed to update job");
      return true;
    } catch (error) {
      console.error("Error updating job:", error);
      return false;
    }
  };


  const deleteJob = async () => {
    try {
      const token = getToken();
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete job");
      toast.success("Job Deleted Successfully");
      navigate("/jobs");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };


  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    const success = await updateJob(updatedJob);
    if (success) {
      toast.success("Job Updated Successfully");
      navigate(`/jobs/${id}`);
    } else {
      toast.error("Failed to update the job");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Error: Job not found.</div>;

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block font-bold">Job Title</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="mb-4">
              <label className="block font-bold">Job Type</label>
              <select
                className="border rounded w-full p-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block font-bold">Location</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-bold">Description</label>
              <textarea
                className="border rounded w-full p-2"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="block font-bold">Salary</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            {/* Company */}
            <h3 className="text-2xl mb-4">Company Info</h3>
            <div className="mb-4">
              <label className="block font-bold">Company Name</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Company Description</label>
              <textarea
                className="border rounded w-full p-2"
                rows="3"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block font-bold">Contact Email</label>
              <input
                type="email"
                className="border rounded w-full p-2"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold">Contact Phone</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
                type="submit"
              >
                Update Job
              </button>
              <button
                type="button"
                onClick={deleteJob}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full"
              >
                Delete Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
