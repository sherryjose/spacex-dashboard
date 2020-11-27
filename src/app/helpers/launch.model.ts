export interface ILaunchDetails {
    flight_number: number;
    mission_name: string;
    mission_id: string[];
    launch_year: string;
    rocket: {
        first_stage: {
            cores: [{
                land_success: boolean;
            }]
        };
    };
    launch_success: boolean;
    links: {
        mission_patch_small: string
    };
}

export interface IFilter {
    isLaunchSuccess: string;
    isLandSuccess: string;
    selectedYear: number | string;
}

export enum outcome {
    success = 'True',
    failure = 'False'
}

export enum launchYear {
    year1 = 2006,
    year2,
    year3,
    year4,
    year5,
    year6,
    year7,
    year8,
    year9,
    year10,
    year11,
    year12,
    year13,
    year14,
    year15
}
