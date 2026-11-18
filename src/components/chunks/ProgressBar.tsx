import { Tooltip, Progress } from "antd";

const ProgressBar = ({ attendees, eventData }:any) => {
    const max = eventData?.MaxMembers || 5;
    const current = attendees?.length || 0;

    const percent = (current / max) * 100;

    return (
        <div className="mx-10">
            
            <Tooltip title={`${current} joined / ${max-current} vacant [Total ${max}]`}>
                <Progress 
                    percent={percent} 
                    showInfo={false}
                    strokeColor="#1d4ed8"
                    trailColor="#e2e8f0"
                />
            </Tooltip>

        </div>
    );
};

export default ProgressBar;
