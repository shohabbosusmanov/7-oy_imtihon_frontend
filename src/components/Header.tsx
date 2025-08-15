import profileImage from "../assets/images/profileImage.svg";
import Icon from "./ui/Icon";

const Header = () => {
    return (
        <header className="w-full h-[50px] flex items-center justify-between">
            <form
                className="bg-white w-[40%] flex gap-x-3 px-6 py-3 rounded-[14px]"
                action=""
            >
                <button className="w-6 h-6 cursor-pointer">
                    <Icon.searchIcon />
                </button>
                <input
                    className="grow outline-none"
                    type="text"
                    placeholder="Search"
                />
            </form>
            <section className="flex py-2 gap-6">
                <button className="w-12 h-12 p-3 rounded-[14px] bg-white cursor-pointer">
                    <Icon.notificationIcon />
                </button>
                <button className="flex gap-3 p-2 items-center bg-white rounded-[14px] cursor-pointer">
                    <img
                        className="w-[30px] h-[30px]"
                        src={profileImage}
                        alt="profileImage"
                    />
                    <span className="font-[600]">Evan Yates</span>
                    <Icon.bottomArrowIcon />
                </button>
            </section>
        </header>
    );
};

export default Header;
