import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfilePicMutation } from "../../redux/features/auth/authApiSlice";
import { setUser } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../utils/cn";
import { baseURL } from "../../constant/baseURL";

const ProfileProgressCard = ({
  resetImgErr,
  imgError,
  dependentId,
  percentage,
  initialImgUrl,
  isActive,
  setDependents,
  setUserInfo,
  navigationPath,
  placeholderImg = "https://via.placeholder.com/150",
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const radius = isMobile ? 22 : 60; // Adjust radius for mobile
  const stroke = isMobile ? 4 : 8; // Adjust stroke for mobile
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const maxOffset = circumference * 0.78; // 80% of the circle length

  // Calculate the offset based on the percentage, relative to 80% of the circumference
  const strokeDashoffset = maxOffset - (percentage / 100) * maxOffset;

  const [imgUrl, setImgUrl] = useState(initialImgUrl);
  const [uploadProgress, setUploadProgress] = useState(null); // Progress (0-100)
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [error, setError] = useState(""); // Track upload errors
  const fileInputRef = useRef(null);
  const [updateProfilePic] = useUpdateProfilePicMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(dependentId, imgError);

  const handleCameraClick = () => {
    // event.stopPropagation();
    if (fileInputRef.current && isActive) {
      fileInputRef.current.click();
    }
  };

  const handleCardClick = () => {
    if (!isUploading) {
      navigate(navigationPath);
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=16631ebb53d644155d4c1ee7892c443a`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data?.success) {
        return data?.data.display_url;
      } else {
        throw new Error(data.error.message || "Upload failed");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleFileChange = async (event) => {
    event.stopPropagation();
    const file = event.target.files[0];

    if (file) {
      setError(null);
      // Reset the existing image URL
      setImgUrl(null);

      // Upload the new image
      const uploadedImgUrl = await uploadToImgBB(file);

      if (uploadedImgUrl) {
        setImgUrl(uploadedImgUrl);

        const storageKey = "OPTIMALMD_USER";
        const storage = localStorage.getItem(storageKey)
          ? localStorage
          : sessionStorage;

        let userData = JSON.parse(storage.getItem(storageKey)) || {};

        if (dependentId) {
          try {
            const response = await fetch(
              `${baseURL}/api/dependent/upload/image`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                  image: uploadedImgUrl,
                  id: dependentId,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update dependent profile picture");
            }

            const responseData = await response.json();

            console.log("Dependent profile pic updated:", responseData);

            if (responseData.message) {
              resetImgErr();
              setDependents((prev) => {
                const index = prev.findIndex((dep) => dep._id === dependentId);
                return [
                  ...prev.slice(0, index),
                  { ...prev[index], image: uploadedImgUrl },
                  ...prev.slice(index + 1),
                ];
              });
              // Update dependent image in Redux and storage
              dispatch(setUser({ user: responseData.user }));
            }
          } catch (error) {
            console.error("Error updating dependent profile picture:", error);
          }
        } else {
          try {
            const response = await updateProfilePic({
              image: uploadedImgUrl,
              id: userData._id,
            }).unwrap();

            console.log("User profile pic updated:", response);

            if (response.message) {
              resetImgErr();
              setUserInfo((prev) => ({ ...prev, image: response.user.image }));

              dispatch(setUser({ user: response.user })); // Update Redux store
            }
          } catch (error) {
            console.error("Error updating user profile picture:", error);
          }
        }
      } else {
        setImgUrl(initialImgUrl || placeholderImg);
      }
    }
  };

  // Effect for getting the screen size on changing screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`flex items-center justify-center lg:w-32 lg:h-32 relative cursor-pointer group ${
        isUploading ? "cursor-not-allowed" : ""
      }`}
      onClick={handleCardClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isUploading}
      />

      <svg
        height={radius * 2}
        width={radius * 2}
        className={cn(
          "transform rotate-[129.5deg]",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeDasharray={`${maxOffset} ${circumference}`}
          strokeLinecap="round"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={error || imgError ? "#ef4444" : "#00836C"}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${maxOffset} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {(error || imgError) && !isUploading && (
        <p
          onClick={handleCameraClick}
          className=" absolute flex bg-white items-center w-8 h-8 md:w-24 md:h-24 rounded-full text-xs text-red-500  font-bold text-center z-10 border border-rose-500"
        >
          {error || imgError}
        </p>
      )}
      <div
        onClick={handleCameraClick}
        className="absolute flex flex-col items-center w-8 h-8 md:w-24 md:h-24 overflow-hidden rounded-full "
      >
        {isActive && !isUploading && (
          <div
            className={`absolute z-50 p-[0.35rem] h-full w-full text-white transition 
              bg-black bg-opacity-30 rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100
      }`}
          >
            <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}

        {isUploading ? (
          <div
            className={`relative flex items-center justify-center w-full h-full  ${
              imgError ? "ring-2 ring-rose-500" : ""
            }`}
          >
            <p className="absolute flex flex-col items-center justify-center w-full h-full text-xs font-medium text-center text-white bg-opacity-60 bg-primary">
              <span>Uploading...</span>
              {uploadProgress}%
            </p>
            <img
              src={imgUrl || placeholderImg}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <img
            src={imgUrl || placeholderImg}
            alt="Profile"
            className={`object-cover w-full h-full`}
          />
        )}
      </div>

      {isActive && !isUploading && (
        <Camera
          className="absolute z-50  p-[0.35rem] md:p-1 text-white transition bg-blue-500 rounded-full hover:bg-blue-600 -top-1 -right-1 md:hidden"
          onClick={handleCameraClick}
        />
      )}
    </div>
  );
};

export default ProfileProgressCard;
