import React, { useState } from 'react'

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:3000/api/match', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
            Select Resume (PDF)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>
      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Matching Results</h3>
          <p><strong>Name:</strong> {results.name}</p>
          <p><strong>Years of Experience:</strong> {results.yearOfExperience}</p>
          <h4 className="font-semibold mt-2">Skills:</h4>
          <ul className="list-disc list-inside">
            {results.resumeSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h4 className="font-semibold mt-2">Top Matching Jobs:</h4>
          {results.matchingJobs.map((job, index) => (
            <div key={index} className="mt-2 p-2 border rounded">
              <p><strong>{job.jobId}</strong> - Score: {job.matchingScore}%</p>
              <ul>
                {job.skillsAnalysis.map((skill, idx) => (
                  <li key={idx} className={skill.presentInResume ? 'text-green-600' : 'text-red-600'}>
                    {skill.skill}: {skill.presentInResume ? 'Present' : 'Missing'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadResume
