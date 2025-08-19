import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/requests/useAuth";

const ProfileDropdown = () => {
    const { data: user, isLoading } = useAuth();

    const fullName = user?.full_name || "My account";

    return (
        <Menu>
            <MenuButton className={"flex"}>
                {isLoading ? "Loading..." : fullName} <Icon.bottomArrowIcon />
            </MenuButton>
            <MenuItems anchor="bottom" className={"p-3 bg-gray-100 mt-2"}>
                <MenuItem>
                    <Link
                        to={"/myprofile"}
                        className="block data-focus:bg-blue-100"
                    >
                        My Profile
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        to={"/upload-photo"}
                        className="block data-focus:bg-blue-100"
                    >
                        Upload Photo
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        to={"/settings"}
                        className="block data-focus:bg-blue-100"
                    >
                        Settings
                    </Link>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default ProfileDropdown;
