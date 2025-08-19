import profileImage from "../assets/images/profileImage.svg";
import { useAuth } from "../hooks/requests/useAuth";
import Icon from "./ui/Icon";
import ProfileDropdown from "./ui/ProfileDropdown";

const Header = () => {
    const { data: user, isLoading } = useAuth();
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
                <button className="w-12 h-12 p-3 rounded-[14px] bg-white hover:bg-[#ebf3ff] cursor-pointer">
                    <Icon.notificationIcon />
                </button>
                <button className="flex gap-3 p-2 items-center bg-white rounded-[14px] hover:bg-[#ebf3ff] cursor-pointer">
                    <img
                        className="w-[30px] h-[30px]"
                        src={
                            isLoading
                                ? profileImage
                                : user.image_url != null
                                ? `http://localhost:4000${user.image_url}`
                                : profileImage
                        }
                        alt="img"
                    />
                    <ProfileDropdown />
                </button>
            </section>
        </header>
    );
};

export default Header;
