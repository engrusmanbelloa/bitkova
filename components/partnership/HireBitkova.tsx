import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import styled from "styled-components"
import { Card, Modal, Box, Fade, Backdrop } from "@mui/material"
import {
    Code,
    TrendingUp,
    Palette,
    Smartphone,
    Cloud,
    Security,
    BarChart,
    Settings,
    Close,
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
const ReadMoreBtn = styled.button`
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 14px;
    font-weight: 600;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    margin-top: 4px;
    &:hover {
        text-decoration: underline;
    }
`
const ModalBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${(props) => props.theme.palette.common.white};
    border-radius: 16px;
    padding: 32px;
    width: 520px;
    max-width: 92vw;
    max-height: 80vh;
    overflow-y: auto;
    outline: none;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`
const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
`
const ModalIconWrap = styled.div`
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: ${(props) => props.theme.mobile.mobileNavBg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.palette.primary.main};
    svg {
        font-size: 28px;
    }
`
const ModalTitle = styled.h2`
    margin: 0 0 6px;
    color: ${(props) => props.theme.palette.common.black};
    font-size: 22px;
`
const ModalDesc = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    font-size: 15px;
    line-height: 1.6;
    margin: 0 0 20px;
`
const CloseBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.palette.common.black};
    padding: 4px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    &:hover {
        background: ${(props) => props.theme.palette.action?.hover ?? "#f5f5f5"};
    }
    svg {
        font-size: 22px;
    }
`
const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
`
const FeatureItem = styled.li`
    font-size: 14px;
    color: ${(props) => props.theme.palette.common.black};
    padding: 8px 0 8px 28px;
    position: relative;
    border-bottom: 1px solid ${(props) => props.theme.palette.divider ?? "#eee"};
    &:last-child {
        border-bottom: none;
    }
    &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.palette.primary.main};
        font-weight: 700;
    }
`
const ModalCTA = styled.button`
    width: 100%;
    padding: 13px 0;
    border: none;
    border-radius: 10px;
    background: ${(props) => props.theme.palette.primary.main};
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
    &:hover {
        opacity: 0.88;
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
    fullDescription: string
    features: string[]
}

// Mock data - this structure can come from Firebase
const services: Service[] = [
    {
        id: "1",
        icon: "code", // Store as string in Firebase
        title: "Web & App Development",
        description: "Custom software solutions tailored to your business needs",
        fullDescription:
            "We build fast, scalable web and mobile applications from concept to deployment. Whether you need a landing page, a full SaaS platform, or a custom internal tool, our team delivers clean, maintainable code.",
        features: [
            "React / Next.js web applications",
            "Mobile apps (React Native)",
            "REST & GraphQL API development",
            "Database design and optimization",
            "Ongoing maintenance and support",
        ],
    },
    {
        id: "2",
        icon: "trending",
        title: "Blockchain Development",
        description: "Smart contracts, DApps, and blockchain integration",
        fullDescription:
            "From ERC-20 tokens to full DeFi protocols, we design and audit smart contracts and build decentralized applications on EVM-compatible chains including Ethereum, Polygon, and BSC.",
        features: [
            "Smart contract development & auditing",
            "DApp frontend integration (ethers.js / wagmi)",
            "Token creation and tokenomics design",
            "NFT platforms and marketplaces",
            "Wallet integration and Web3 onboarding",
        ],
    },
    {
        id: "3",
        icon: "palette",
        title: "Graphics & UI/UX Design",
        description: "Beautiful, user-centered design for digital products",
        fullDescription:
            "We craft visual identities and digital experiences that convert. From brand kits to full product design, our designers deliver pixel-perfect work grounded in usability research.",
        features: [
            "Brand identity and logo design",
            "UI/UX design for web and mobile",
            "Figma prototypes and design systems",
            "Social media graphics and motion design",
            "Design-to-code handoff",
        ],
    },
]

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Code
    return <IconComponent />
}

export default function HireBitkova({ id }: { id?: string }) {
    // In production, fetch from Firebase:
    // 1. use usequery to get services collection
    // 2. map over the data to render the cards
    const [selectedService, setSelectedService] = useState<Service | null>(null)

    const handleOpenModal = (service: Service) => setSelectedService(service)
    const handleCloseModal = () => setSelectedService(null)

    const handleRequestQuote = () => {
        handleCloseModal()
        setTimeout(() => {
            document.getElementById("request-quote")?.scrollIntoView({ behavior: "smooth" })
        }, 150)
    }

    return (
        <Container id={id}>
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
                                <ReadMoreBtn onClick={() => handleOpenModal(service)}>
                                    Read More ›
                                </ReadMoreBtn>
                            </ServiceCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SwiperWrapper>

            <Modal
                open={!!selectedService}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 300 } }}
            >
                <Fade in={!!selectedService}>
                    <ModalBox>
                        {selectedService && (
                            <>
                                <ModalHeader>
                                    <ModalIconWrap>
                                        {(() => {
                                            const Icon = iconMap[selectedService.icon] || Code
                                            return <Icon />
                                        })()}
                                    </ModalIconWrap>
                                    <CloseBtn onClick={handleCloseModal}>
                                        <Close />
                                    </CloseBtn>
                                </ModalHeader>

                                <ModalTitle>{selectedService.title}</ModalTitle>
                                <ModalDesc>{selectedService.fullDescription}</ModalDesc>

                                <FeatureList>
                                    {selectedService.features.map((f, i) => (
                                        <FeatureItem key={i}>{f}</FeatureItem>
                                    ))}
                                </FeatureList>

                                <ModalCTA onClick={handleRequestQuote}>
                                    Request a Quote for This Service →
                                </ModalCTA>
                            </>
                        )}
                    </ModalBox>
                </Fade>
            </Modal>
        </Container>
    )
}
