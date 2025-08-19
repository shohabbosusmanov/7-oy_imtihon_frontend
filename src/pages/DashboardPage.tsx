import Icon from "../components/ui/Icon";
import photo1 from "../assets/images/photo.svg";
import photo2 from "../assets/images/photo2.svg";
import photo3 from "../assets/images/photo3.svg";
import photo4 from "../assets/images/photo4.svg";
import photo5 from "../assets/images/photo5.svg";
import photo6 from "../assets/images/photo6.svg";
import photo7 from "../assets/images/photo7.svg";
import photo8 from "../assets/images/photo8.svg";
import DashboardCard from "../components/ui/DashboardCard";
import { useAuth } from "../hooks/requests/useAuth";
import Loader from "../components/ui/Loader";

const DashboardPage = () => {
    const { data: user, isLoading } = useAuth();

    return (
        <div className="p-[10px]">
            <span className="text-[#7D8592]">
                Welcome back, {isLoading ? <Loader /> : user?.full_name}!
            </span>
            <div className="mt-4 mb-7 flex items-center justify-between">
                <h1 className="text-[#0A1629] text-4xl font-[700] ">
                    Dashboard
                </h1>
                <button className="text-[#0A1629] flex gap-3 bg-[#E6EDF5] rounded-2xl px-4 py-3">
                    {Icon.calendar("#0A1629")} Nov 16, 2020 - Dec 16, 2020
                </button>
            </div>
            <section className="flex gap-8">
                <div className=" w-[63%] p-5 rounded-3xl bg-white">
                    <div className="flex items-end justify-between mb-4">
                        <span className="text-[22px] font-[600">Workload</span>
                        <button className="flex text-[#3F8CFF] cursor-pointer">
                            View all <Icon.rightArrowIcon2 />{" "}
                        </button>
                    </div>
                    <div className="cards grid grid-cols-4 gap-4">
                        <DashboardCard
                            photo={photo1}
                            name="Shawn Stone"
                            proffesion="UI/UX Designer"
                            position="Middle"
                        />
                        <DashboardCard
                            photo={photo2}
                            name="Randy Delgado"
                            proffesion="UI/UX Designer"
                            position="Junior"
                        />
                        <DashboardCard
                            photo={photo3}
                            name="Emily Tyler"
                            proffesion="Copywriter"
                            position="Middle"
                        />
                        <DashboardCard
                            photo={photo4}
                            name="Louis Castro"
                            proffesion="Copywriter"
                            position="Senior"
                        />
                        <DashboardCard
                            photo={photo5}
                            name="Blake Silva"
                            proffesion="IOS Developer"
                            position="Senior"
                        />
                        <DashboardCard
                            photo={photo6}
                            name="Joel Phillips"
                            proffesion="UI/UX Designer"
                            position="Middle"
                        />
                        <DashboardCard
                            photo={photo7}
                            name="Wayne Marsh"
                            proffesion="Copywriter"
                            position="Junior"
                        />
                        <DashboardCard
                            photo={photo8}
                            name="Oscar Holloway"
                            proffesion="UI/UX Designer"
                            position="Middle"
                        />
                    </div>
                </div>
                <div className="w-[35%] bg-white p-5 rounded-3xl flex flex-col justify-between">
                    <div className="flex items-end justify-between mb-4">
                        <span className="text-[22px] font-[600">
                            Nearest Events
                        </span>
                        <button className="flex text-[#3F8CFF] cursor-pointer">
                            View all <Icon.rightArrowIcon2 />{" "}
                        </button>
                    </div>
                    <div className="w-full flex gap-5 h-fit">
                        <div className="h-[104px] w-1 bg-[#3F8CFF] rounded-[2px]" />
                        <div className="flex flex-col w-full justify-between">
                            <div className="mt-[5px] w-full flex items-start justify-between">
                                <p className="w-[185px] text-[#0A1629] text-base font-[600]">
                                    Presentation of the new department
                                </p>
                                <Icon.topArrowIcon />
                            </div>
                            <div className="mb-[5px] w-full flex items-end justify-between">
                                <p className="text-sm text-[#91929E]">
                                    Today | 5:00 PM
                                </p>
                                <span className="flex gap-[6px] p-2 rounded-2 bg-[#f3f8fc]">
                                    <Icon.timeIcon /> 4h
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-5 h-fit">
                        <div className="h-[104px] w-1 bg-[#DE92EB] rounded-[2px]" />
                        <div className="flex flex-col w-full justify-between">
                            <div className="mt-[5px] w-full flex items-start justify-between">
                                <p className="w-[185px] text-[#0A1629] text-base font-[600]">
                                    Anna’s Birthday
                                </p>
                                <Icon.bottomArrowIcon2 />
                            </div>
                            <div className="mb-[5px] w-full flex items-end justify-between">
                                <p className="text-sm text-[#91929E]">
                                    Today | 6:00 PM
                                </p>
                                <span className="flex gap-[6px] p-2 rounded-2 bg-[#f3f8fc]">
                                    <Icon.timeIcon /> 4h
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-5 h-fit">
                        <div className="h-[104px] w-1 bg-[#DE92EB] rounded-[2px]" />
                        <div className="flex flex-col w-full justify-between">
                            <div className="mt-[5px] w-full flex items-start justify-between">
                                <p className="w-[185px] text-[#0A1629] text-base font-[600]">
                                    Ray’s Birthday
                                </p>
                                <Icon.bottomArrowIcon2 />
                            </div>
                            <div className="mb-[5px] w-full flex items-end justify-between">
                                <p className="text-sm text-[#91929E]">
                                    Tomorrow | 2:00 PM
                                </p>
                                <span className="flex gap-[6px] p-2 rounded-2 bg-[#f3f8fc]">
                                    <Icon.timeIcon /> 4h
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
