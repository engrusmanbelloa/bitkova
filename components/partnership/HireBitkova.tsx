import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import styled from "styled-components"
import { Typography, Card } from "@mui/material"
import {
    Code,
    TrendingUp,
    Palette,
    Smartphone,
    Cloud,
    Security,
    BarChart,
    Settings,
} from "@mui/icons-material"
import "swiper/css"
import "swiper/css/navigation"
import { mobile, ipad } from "@/responsive"

const Container = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    padding: 0;
    margin: 0 auto 30px;
    box-sizing: border-box;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: 100%;
            max-width: ${props.theme.widths.mobileWidth};
        `,
    )}
`
const SectionTitle = styled.h2`
      color: ${(props) => props.theme.palette.common.black};
      margin-bottom: 8px;
    }
`
const SectionSubtitle = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    margin-bottom: 0px;
`
const SwiperWrapper = styled(Card)`
    position: relative;
    padding: 0 15px;
    border-radius: 8px;

    .swiper {
        padding: 20px 0;
    }

    .swiper-button-prev,
    .swiper-button-next {
        width: 35px;
        height: 35px;
        background: white;
        border: 1px solid ${(props) => props.theme.mobile.horizontalrule};
        border-radius: 50%;
        padding: 5px;
        box-sizing: border-box;
        color: ${(props) => props.theme.palette.primary.main};

        &:after {
            font-size: 16px;
            font-weight: bold;
        }
    }
`
const ServiceCard = styled.div`
    border-radius: 8px;
    padding: 0 50px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ServiceIconWrapper = styled.div`
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.mobile.mobileNavBg};
    border-radius: 8px;
    color: ${(props) => props.theme.palette.primary.main};

    svg {
        font-size: 28px;
    }
`
const ServiceTitle = styled.h2`
    color: ${(props) => props.theme.palette.common.black};
    margin-bottom: 5px;
    margin-top: 0;
`
const ServiceDescription = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    margin: 5px 0;
`
const ReadMoreLink = styled.a`
    color: ${(props) => props.theme.palette.primary.main};
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    margin-top: 0;

    &:hover {
        text-decoration: underline;
    }
`

// Icon mapping for Firebase string values
const iconMap: Record<string, typeof Code> = {
    code: Code,
    trending: TrendingUp,
    palette: Palette,
    smartphone: Smartphone,
    cloud: Cloud,
    security: Security,
    chart: BarChart,
    settings: Settings,
}

// Type for service data from Firebase
interface Service {
    id: string
    icon: string
    title: string
    description: string
    link?: string
}

// Mock data - this structure can come from Firebase
const services: Service[] = [
    {
        id: "1",
        icon: "code", // Store as string in Firebase
        title: "Web & App Development",
        description: "Custom software solutions tailored to your business needs",
        link: "#",
    },
    {
        id: "2",
        icon: "trending",
        title: "Blockchain Development",
        description: "Smart contracts, DApps, and blockchain integration",
        link: "#",
    },
    {
        id: "3",
        icon: "palette",
        title: "Graphics & UI/UX Design",
        description: "Beautiful, user-centered design for digital products",
        link: "#",
    },
]

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Code
    return <IconComponent />
}

export default function HireBitkova() {
    // In production, fetch from Firebase:
    // const [services, setServices] = useState<Service[]>([]);
    // useEffect(() => {
    //   const fetchServices = async () => {
    //     const snapshot = await getDocs(collection(db, 'services'));
    //     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     setServices(data);
    //   };
    //   fetchServices();
    // }, []);

    return (
        <Container>
            <SectionTitle>Hire Bitkova</SectionTitle>
            <SectionSubtitle>
                Professional services tailored for your business needs
            </SectionSubtitle>

            <SwiperWrapper elevation={3}>
                <Swiper modules={[Navigation]} spaceBetween={16} slidesPerView={1} navigation>
                    {services.map((service) => (
                        <SwiperSlide key={service.id}>
                            <ServiceCard>
                                <ServiceIconWrapper>
                                    {getIconComponent(service.icon)}
                                </ServiceIconWrapper>
                                <ServiceTitle>{service.title}</ServiceTitle>
                                <ServiceDescription>{service.description}</ServiceDescription>
                                <ReadMoreLink href={service.link || "#"}>Read More ›</ReadMoreLink>
                            </ServiceCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SwiperWrapper>
        </Container>
    )
}
