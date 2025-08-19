import assignees1 from "../assets/images/assignees1.svg";
import assignees2 from "../assets/images/assignees2.svg";
import assignees3 from "../assets/images/assignees3.svg";
import profileImg from "../assets/images/profileImage.svg";
import ProjectsImg1 from "../assets/images/projectsImg1.svg";
import ProjectsImg2 from "../assets/images/projectsImg2.svg";
import ProjectsImg3 from "../assets/images/projectsImg3.svg";
import Icon from "../components/ui/Icon";
import Input from "../components/ui/Input";
import NavigationTabs from "../components/ui/NavigationTab";
import Select from "../components/ui/Select";
import { useAuth } from "../hooks/requests/useAuth";

const MyProfilePage = () => {
    const { data: user, isLoading } = useAuth();

    return (
        <div className="p-[10px]">
            <div className="flex justify-between items-center mb-7">
                <h1 className="text-[#0A1629] text-4xl font-[700]">
                    My Profile
                </h1>
                <span className="p-3 rounded-[14px] bg-white">
                    <Icon.settingsIcon />
                </span>
            </div>
            <div className="flex gap-8">
                <section className="grow-1 bg-white rounded-3xl p-6 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
                            <img
                                className="w-[64px] h-[64px]"
                                src={
                                    isLoading
                                        ? profileImg
                                        : user.image_url != null
                                        ? `http://localhost:4000${user.image_url}`
                                        : profileImg
                                }
                                alt=""
                            />
                        </div>
                        <Icon.editIcon />
                    </div>
                    <span className="text-[22px] mt-4 font-[600]">
                        {isLoading ? "Loading..." : user.full_name}
                    </span>
                    <span className="text-sm">UI/UX Designer</span>
                    <hr className="text-[#E4E6E8] mt-7 mb-7" />
                    <span className="text-[#0A1629] text-[18px] font-[600]">
                        Main info
                    </span>
                    <Input
                        label="Position"
                        placeholder="UI/UX Designer"
                        inputClassName=""
                        type="text"
                    />
                    <Input
                        label="Company"
                        placeholder="Cadabra"
                        inputClassName=""
                        type="text"
                    />
                    <div className="relative">
                        <Input
                            label="Location"
                            placeholder="NYC, New York, USA"
                            inputClassName=""
                            type="text"
                        />
                        <div className="absolute bottom-[11px] left-48">
                            <Icon.locationIcon />
                        </div>
                    </div>
                    <div className="relative">
                        <Input
                            label="Birthday Date"
                            placeholder="May 19, 1996"
                            inputClassName=""
                            type="text"
                        />
                        <div className="absolute bottom-[11px] left-48">
                            {Icon.calendar("#7D8592")}
                        </div>
                    </div>
                    <span className="text-[#0A1629] text-[18px] font-[600] mt-8">
                        Contact info
                    </span>
                    <Input
                        label="Email"
                        placeholder={isLoading ? "Loading..." : user.email}
                        inputClassName=""
                        type="text"
                    />
                    <Input
                        label="Mobile Number"
                        placeholder={
                            isLoading ? "Loading..." : user.phone_number
                        }
                        inputClassName=""
                        type="text"
                    />
                    <Input
                        label="Skype"
                        placeholder={
                            isLoading ? "Loading..." : `${user.full_name} 2256`
                        }
                        inputClassName=""
                        type="text"
                    />
                </section>
                <section className="grow-4 flex flex-col gap-5 rounded-3xl">
                    <div className="w-full h-fit flex justify-between items-center mb-6">
                        <div>
                            <NavigationTabs />
                        </div>
                        <div className="flex gap-6">
                            <div className="p-3 h-fit w-fit rounded-[14px] bg-white">
                                <Icon.filterIcon />
                            </div>
                            <div>
                                <Select
                                    options={[
                                        {
                                            value: "Current Projects",
                                            label: "Current Projects",
                                        },
                                        {
                                            value: "option2",
                                            label: "option2",
                                        },
                                        {
                                            value: "option3",
                                            label: "option3",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white p-[24px_60px_24px_24px] rounded-3xl flex justify-between">
                        <div className="w-[45%]">
                            <div className="flex gap-5 mb-6">
                                <div>
                                    <img src={ProjectsImg1} alt="" />
                                </div>
                                <div>
                                    <span className="text-sm text-[#91929E]">
                                        PN0001265
                                    </span>
                                    <p className="text-[18px] text-[#0A1629] font-[600]">
                                        Medical App (iOS native)
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-2 text-[#7D8592]">
                                    {Icon.calendar("#7D8592")} Created Sep 12,
                                    2020
                                </span>
                                <span className="flex items-center gap-2 text-[#FFBD21]">
                                    <Icon.topArrowIcon /> Medium
                                </span>
                            </div>
                        </div>
                        <div className="w-[1px] h-full bg-[#E4E6E8]"></div>
                        <div className="w-[45%] flex flex-col justify-between">
                            <div className="text-[18px] text-[#0A1629] font-[600]">
                                Project Data
                            </div>
                            <div className="flex justify-between text-sm text-[#91929E]">
                                <div>
                                    <p>All tasks</p>
                                    <p className="text-base text-[#0A1629] font-[600]">
                                        34
                                    </p>
                                </div>
                                <div>
                                    <p>Active tasks</p>
                                    <p className="text-base text-[#0A1629] font-[600]">
                                        13
                                    </p>
                                </div>
                                <div>
                                    <p>Assignees</p>
                                    <p>
                                        <div className="flex -space-x-2 rtl:space-x-reverse">
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees1}
                                                alt=""
                                            />
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees2}
                                                alt=""
                                            />
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees3}
                                                alt=""
                                            />
                                            <a
                                                className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-[#3F8CFF] rounded-full hover:bg-[#3f8cffa9]"
                                                href="#"
                                            >
                                                +2
                                            </a>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white p-[24px_60px_24px_24px] rounded-3xl flex justify-between">
                        <div className="w-[45%]">
                            <div className="flex gap-5 mb-6">
                                <div>
                                    <img src={ProjectsImg2} alt="" />
                                </div>
                                <div>
                                    <span className="text-sm text-[#91929E]">
                                        PN0001221
                                    </span>
                                    <p className="text-[18px] text-[#0A1629] font-[600]">
                                        Food Delivery Service
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-2 text-[#7D8592]">
                                    {Icon.calendar("#7D8592")} Created Sep 10,
                                    2020
                                </span>
                                <span className="flex items-center gap-2 text-[#FFBD21]">
                                    <Icon.topArrowIcon /> Medium
                                </span>
                            </div>
                        </div>
                        <div className="w-[1px] h-full bg-[#E4E6E8]"></div>
                        <div className="w-[45%] flex flex-col justify-between">
                            <div className="text-[18px] text-[#0A1629] font-[600]">
                                Project Data
                            </div>
                            <div className="flex justify-between text-sm text-[#91929E]">
                                <div>
                                    <p>All tasks</p>
                                    <p className="text-base text-[#0A1629] font-[600]">
                                        50
                                    </p>
                                </div>
                                <div>
                                    <p>Active tasks</p>
                                    <p className="text-base text-[#0A1629] font-[600]">
                                        24
                                    </p>
                                </div>
                                <div>
                                    <p>Assignees</p>
                                    <p>
                                        <div className="flex -space-x-2 rtl:space-x-reverse">
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees1}
                                                alt=""
                                            />
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees2}
                                                alt=""
                                            />
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees3}
                                                alt=""
                                            />
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white p-[24px_60px_24px_24px] rounded-3xl flex justify-between">
                        <div className="w-[45%]">
                            <div className="flex gap-5 mb-6">
                                <div>
                                    <img src={ProjectsImg3} alt="" />
                                </div>
                                <div>
                                    <span className="text-sm text-[#91929E]">
                                        PN0001290
                                    </span>
                                    <p className="text-[18px] text-[#0A1629] font-[600]">
                                        Internal Project
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-2 text-[#7D8592]">
                                    {Icon.calendar("#7D8592")} Created May 28,
                                    2020
                                </span>
                                <span className="flex items-center gap-2 text-[#0AC947]">
                                    <Icon.bottomArrowIcon2 /> Low
                                </span>
                            </div>
                        </div>
                        <div className="w-[1px] h-full bg-[#E4E6E8]"></div>
                        <div className="w-[45%] flex flex-col justify-between">
                            <div className="text-[18px] text-[#0A1629] font-[600]">
                                Project Data
                            </div>
                            <div className="flex justify-between text-sm text-[#91929E]">
                                <div>
                                    <p>All tasks</p>
                                    <p className="text-base text-[#0A1629] font-[600]">
                                        23
                                    </p>
                                </div>
                                <div>
                                    <p>Active tasks</p>
                                    <p className="text-base text-[#0A1629] font-[600]">
                                        20
                                    </p>
                                </div>
                                <div>
                                    <p>Assignees</p>
                                    <p>
                                        <div className="flex -space-x-2 rtl:space-x-reverse">
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees1}
                                                alt=""
                                            />
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees2}
                                                alt=""
                                            />
                                            <img
                                                className="w-6 h-6 border-white rounded-full dark:border-gray-800"
                                                src={assignees3}
                                                alt=""
                                            />
                                            <a
                                                className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-[#3F8CFF] rounded-full hover:bg-[#3f8cffa9]"
                                                href="#"
                                            >
                                                +5
                                            </a>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MyProfilePage;
