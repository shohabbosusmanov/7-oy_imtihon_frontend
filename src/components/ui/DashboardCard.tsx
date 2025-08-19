interface DProps {
    photo: string;
    name: string;
    proffesion: string;
    position: string;
}

const DashboardCard = ({ photo, name, proffesion, position }: DProps) => {
    return (
        <div className="rounded-3xl w-[180px] h-[180px] bg-[#f4f9fd] p-4 flex flex-col items-center cursor-pointer">
            <img src={photo} alt="" />
            <span className="text-base mt-4 font-[600]">{name}</span>
            <span className="text-sm">{proffesion}</span>
            <span className="text-[12px] w-fit mt-2 text-[#7D8592] border border-[#7D8592] px-1 rounded-[4px]">
                {position}
            </span>
        </div>
    );
};

export default DashboardCard;
