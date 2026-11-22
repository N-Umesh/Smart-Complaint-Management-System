import React, {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

const ReportComplaint = () => {

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [city, setCity] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setMessage("");
    setError("");


    if (
      !title ||
      !description ||
      !category ||
      !location
    ) {

      setError(
        "Please fill all required fields."
      );

      return;
    }


    try {

      setLoading(true);


      const formData =
        new FormData();


      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "location",
        location
      );

      formData.append(
        "city",
        city
      );


      if (image) {

        formData.append(
          "image",
          image
        );

      }


      console.log(
        "========== SENDING =========="
      );


      for (
        const [key, value]
        of formData.entries()
      ) {

        console.log(
          key,
          value
        );

      }


      const response =
        await axios.post(

          "http://localhost:4000/api/complaint",

          formData,

          {
            withCredentials:
              true,
          }

        );


      console.log(
        "SERVER RESPONSE:",
        response.data
      );


      setMessage(
        "Complaint submitted successfully!"
      );


      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setCity("");
      setImage(null);


      setTimeout(
        () => {
          navigate(
            "/my-complaints"
          );
        },
        1200
      );


    } catch (error) {

      console.error(
        "COMPLAINT ERROR:",
        error
      );


      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );


      setError(

        error.response?.data?.message ||

        "Failed to submit complaint."

      );


    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-slate-50">


      {/* HEADER */}

      <div className="bg-slate-950 text-white">

        <div className="max-w-6xl mx-auto px-6 py-6">

          <button
            onClick={() =>
              navigate("/")
            }
            className="text-slate-300 hover:text-white mb-4"
          >
            ← Back to Home
          </button>


          <h1 className="text-3xl font-bold">
            Report a Complaint
          </h1>


          <p className="text-slate-300 mt-2">
            Report a civic issue in your city.
          </p>

        </div>

      </div>


      {/* FORM */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">


          {message && (

            <div className="mb-6 rounded-lg bg-green-100 border border-green-300 text-green-700 px-4 py-3">

              {message}

            </div>

          )}


          {error && (

            <div className="mb-6 rounded-lg bg-red-100 border border-red-300 text-red-700 px-4 py-3">

              {error}

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >


            {/* TITLE */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Complaint Title *

              </label>


              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Example: Large pothole near main road"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Description *

              </label>


              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows="5"
                placeholder="Describe the problem..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

            </div>


            {/* CATEGORY */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Category *

              </label>


              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Roads">
                  Roads
                </option>

                <option value="Garbage">
                  Garbage
                </option>

                <option value="Street Lights">
                  Street Lights
                </option>

                <option value="Water">
                  Water
                </option>

                <option value="Drainage">
                  Drainage
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* LOCATION */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Location *

              </label>


              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                placeholder="Example: RR Nagar Main Road"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* CITY */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                City

              </label>


              <input
                type="text"
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                placeholder="Example: Bengaluru"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* IMAGE */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Upload Image

              </label>


              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
                className="w-full border border-slate-300 rounded-lg px-4 py-3"
              />


              <p className="text-xs text-slate-500 mt-2">

                JPG, JPEG, PNG or WEBP. Maximum 5 MB.

              </p>

            </div>


            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">


              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition"
              >

                {loading
                  ? "Submitting..."
                  : "Submit Complaint"}

              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/my-complaints"
                  )
                }
                className="flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-lg transition"
              >

                My Complaints

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
};

export default ReportComplaint;