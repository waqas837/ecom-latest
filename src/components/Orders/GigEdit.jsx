import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../apiUrl';
import StarRatings from "react-star-ratings"

const GigEdit = () => {
    const { gigId } = useParams();
    const [gigDetails, setGigDetails] = useState([]);
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        category: "",
        productImg: "",
    });

    useEffect(() => {
        getSingleGigDetails();
    }, []);
    const getSingleGigDetails = async () => {
        try {
            let { data } = await axios.get(`${apiUrl}/user/getSingleProduct/${gigId}`);
            setGigDetails(data.data);

            console.log("Products must be ", data);
        } catch (error) {
            console.log("Err in function getSingleGigDetails", error);
        }
    };

    // update gig
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let { data } = await axios.get(`${apiUrl}/user/getSingleProduct/${gigId}`);
            setGigDetails(data.data);

            console.log("Products must be ", data);
        } catch (error) {
            console.log("Err in function getSingleGigDetails", error);
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    // user profile update
    const userProfileUpdateSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData(); // Create FormData object to send file
            formData.append("file", file2);
            setFile2(false);
            let userdata = localStorage.getItem("cUser");
            let userdataparsed = JSON.parse(userdata);
            let userid = userdataparsed._id;
            let { data } = await axios.patch(
                `${apiUrl}/user/userProfileImage/${userid}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setrerender(!rerender);
        } catch (error) {
            console.log("error in userProfileUpdate", error);
        }
    };
    return (
        <><div>
            <h1 className='my-10 text-xl font-bold text-center text-gray-500'>{gigDetails && gigDetails.title}</h1>
            <div className="text bg-white rounded-lg overflow-hidden shadow-lg ring-opacity-40 max-w-sm m-auto">
                <div className="relative cursor-pointer">
                    <img
                        width={500}
                        height={500}
                        src={`${apiUrl}/images/${gigDetails && gigDetails.productimg}`}
                        alt="Product Image" />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{gigDetails && gigDetails.title}</h3>
                    <h3 className="text-lg font-medium mb-2">
                        {gigDetails && gigDetails.category}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                        {gigDetails && gigDetails.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">
                            Price ${gigDetails && gigDetails.price}
                        </span>
                        <span className="font-bold">
                            Order Completed ({gigDetails && gigDetails.completedOrders})
                        </span>
                    </div>
                </div>
            </div>
        </div><div className="flex items-center justify-center w-full">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form className="py-4 px-9" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                for="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Attractive Title:
                            </label>
                            <input
                                onChange={handleInputChange}
                                name="title"
                                placeholder=""
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={gigDetails && gigDetails.title}
                                required />
                        </div>

                        <div className="mb-5">
                            <label
                                for="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Description
                            </label>
                            <textarea
                                required
                                onChange={handleInputChange}
                                name="description"
                                placeholder="Best description"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                
                                />
                        </div>

                        <div className="mb-6 pt-4">
                            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                                Product image
                            </label>

                            <div className="mb-8">
                                <input
                                    onChange={handleFileChange}
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="sr-only"
                                    required />
                                <label
                                    for="file"
                                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                                >
                                    <div>
                                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                            Drop files here
                                        </span>
                                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                            Or
                                        </span>
                                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                            Browse
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="my-8">
                            <h1 className="my-3">Select a category</h1>
                            <select
                                name="category"
                                value={inputs.dropdownValue}
                                onChange={handleInputChange}
                                className="block w-full text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
                            >
                                <option value="-Select">--Select</option>
                                <option value="Web Developer">
                                    {" "}
                                    Web Developer
                                </option>
                                <option value="Graphic Designer">
                                    Graphic Designer
                                </option>
                                <option value="Logo Creation">
                                    Logo Creation{" "}
                                </option>
                            </select>
                        </div>
                        <div>
                            <h1 className="my-2">Price In Dollars</h1>
                            <input
                                onChange={handleInputChange}
                                type="number"
                                name="price"
                                id="price"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mb-5"
                                required />
                        </div>
                        <div>
                            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div></>
    );
};

export default GigEdit;
