export interface AboutUs{
    id: number;
    sectionTitle: string;
    sectionContent: string;
    imageUrl: string;
    videoUrl: string;
}

export interface AboutUsCreateDto{
    sectionTitle: string;
    sectionContent: string;
    imageUrl: string;
    videoUrl: string;
}

export interface AboutUsUpdateDto{
    sectionTitle: string;
    sectionContent: string;
    imageUrl: string;
    videoUrl: string;
}