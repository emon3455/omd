import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ringimage1 from "../../assets/pexels-blitzboy-1040880.png"
import ringimage2 from "../../assets/pexels-emilygarland-1499327.png"
import ringimage3 from "../../assets/pexels-gabby-k-5384445.png"
import ringimage8 from "../../assets/Profile.png"
import ringimage5 from "../../assets/women-1.png"
import ringimage6 from "../../assets/women-2.png"
import ringimage7 from "../../assets/women-3.png"
import img1 from "../../assets/blogs/consultation.jpg"
import img2 from "../../assets/blogs/discussion.jpg"
import img3 from "../../assets/blogs/smilywomen.jpg"
import img4 from "../../assets/blogs/exercise.jpg"
import img5 from "../../assets/blogs/tablets.jpg"
import img6 from "../../assets/blogs/weightloss.jpg"
import ThidCardColumn from "./components/ThirdCardColumn";
import ringimage4 from "../../assets/women-2.png"
import HomeBlogs from "./sections/HomeBlogs";
import HomeBanner from "./sections/HomeBanner";
import Modal from "../../component/modals/Modal";
import CButton from "../../utils/CButton/CButton";
import ClinicPortal from "./components/FirstCardCol";
import Pharmacy from "./components/SecondCardCol";
import Supplement from "./components/Supplement";
import HealthCard from "./components/HealthCard";
import Support from "./components/Support";
import RoundOrbitcard from "./components/RoundOrbitcard";
import ProfileCard from "./components/ProfileCard";

function HomePage() {

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);
  const images = { ringimage1, ringimage2, ringimage3, ringimage4, ringimage5, ringimage6, ringimage7, ringimage8 }
  const bgImage = [
    {
      img: img1,
      title: "Hormone replacement therapy can help redistribute peri-menopausal weight gain",
      url: "https://www.uchicagomedicine.org/forefront/womens-health-articles/menopause-weight-gain-hormone-therapy",
      date: "April 24, 2023"
    },
    {
      img: img2,
      title: "Treating the Side Effects of Hormone Therapy",
      url: "https://youtu.be/E_zZ-lG6eeY",
       date: "Jun 24, 2023"
    },
    {
      img: img3,
      title: "Probiotic supplement could help with menopausal belly bulge",
      url: "https://healthinsider.news/gynecology-veteran-reveals-this-gut-bacteria-retreat-gut-supplement-en/?utm_source=facebook&utm_medium=cpc&utm_campaign=%F0%9F%9A%80+LP%3AHealth+Insider+%7C%7C+MAIN+ASC%2B+CC+-+3k+%7C%7C+2024.01.04&utm_content=%F0%9F%9A%80+LP%3AHealth+Insider+%7C%7C+MAIN+ASC%2B+%7C%7C+1C+%7C%7C+2024.01.04&utm_term=BI_2023_Aug_W8-5_F-WL_FB_159_ER_IMG_1x1_New_HE-81_BC-34_E-EGGS_blog_menopause_cv_en_V01&campaign_id=120203983209270267&adset_id=120203983209260267&ad_id=120203983209410267&fbc_id=120203983209260267&h_ad_id=120203983209410267&meta_placement=Facebook_Desktop_Feed&fbclid=IwAR3tSfvOzf79Uev6JYx6viC0gZKgJ0w9tOpEiSzN-HJTehR69eSqShJzvrU",
       date: "Nov 6, 2024"
    },
    {
      img: img4,
      title: "Obtaining accurate testosterone level measurements is tricky",
      url: "https://www.health.harvard.edu/staying-healthy/testosterone--what-it-does-and-doesnt-do",
       date: "June 22, 2023"
    },
    {
      img: img5,
      title: "Weight-loss drugs affect birth control",
      url: "https://www.medscape.com/s/viewarticle/997498?ecd=wnl_tp10_daily_231018_MSCPEDIT_etid5968250&uac=196110AN&impID=5968250",
       date: "October 18, 2023"
    },
    {
      img: img6,
      title: "Weight-loss surgery improves testosterone deficiency",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10286330/",
       date: "Jun 22, 2023"
    }
  ]
  useEffect(() => {
    if (!user?.PrimaryMemberGUID && !user?.lyricsUserId) {
      setOpenModal(true);
    }
  }, [setOpenModal, user]);

  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    }
  }, [user?._id, navigate]);
  const handleCompleteProfile = () => {
    navigate("/update-profile");
  }

  return (
    <div className="flex flex-col  items-start justify-center  lg:mb-16 mx-auto  ">
      <div className=" px-4 grid gap-4 justify-items-center justify-center lg:gap-20  lg:px-0 lg:space-y-0 space-y-2  my-4   mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center lg:items-end lg:max-w-screen-xl mx-auto gap-4 lg:gap-8">
          <div className="space-y-4 grid  px-2 col-span-2 ">
            <div className="inline lg:hidden">
              <ThidCardColumn />
            </div>

            <ProfileCard />
            <div className="grid gap-4 lg:grid-cols-2">
              <ClinicPortal />
              <Pharmacy />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              <Supplement />
              <HealthCard />
              <Support />
            </div>
          </div>
          <div className="col-span-1 grid gap-4 self-center lg:mt-28 lg:border-l-2 border-dashed lg:pl-8">
           <div className="hidden lg:inline">
           <ThidCardColumn />
           </div>
            <RoundOrbitcard images={images} />
          </div>
        </div>




        <div className=" w-full mx-auto px-2 grid gap-  lg:max-w-screen-xl space-y-20">
          <HomeBanner />

          <HomeBlogs bgImage={bgImage} />
        </div>
      </div>

      {
        openModal && <Modal className="p-6 max-w-xl" isOpen={openModal} onClose={() => setOpenModal(false)}>
          <h2 className="text-2xl font-bold text-center">
            Please Complete Your Profile To Get Our Clinic and Pharmacy Services
          </h2>
          <div className="flex gap-2 justify-center my-5">
            <CButton variant={"outline"} onClick={() => setOpenModal(false)}>
              Not Now
            </CButton>
            <CButton variant={"solid"} className={"text-white"} onClick={handleCompleteProfile}>
              Get Started
            </CButton>
          </div>
        </Modal>
      }

    </div>
  );
}

export default HomePage;
