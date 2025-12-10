import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import styled from "styled-components"
import { TextField, Button, Card } from "@mui/material"
import { toast } from "sonner"
import EnrollButton from "@/components/EnrollButton"
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
const EventsTitle = styled.h2`
    color: ${(props) => props.theme.palette.common.black};
    margin-bottom: 20px;
`
const EventsCard = styled(Card)`
    background: ${(props) => props.theme.palette.common.white};
    border-radius: 8px;
    padding: 24px;
    border: 1px solid ${(props) => props.theme.mobile.horizontalrule};
`
const TrainingSection = styled.div`
    margin-bottom: 24px;
`
const TrainingTitle = styled.h3`
    color: ${(props) => props.theme.palette.primary.main};
    margin-bottom: 16px;
`
const TrainingList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
const TrainingItem = styled.li`
    font-size: 14px;
    color: ${(props) => props.theme.palette.common.black};
    padding: 10px 0;
    padding-left: 24px;
    position: relative;
    display: flex;
    align-items: center;

    &:before {
        content: "›";
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.palette.primary.main};
        font-size: 30px;
        font-weight: bold;
    }
    ${mobile(
        (props: any) => `
           line-height: 24px;
        `,
    )}
`
const BenefitsSection = styled.div`
    background: ${(props) => props.theme.mobile.mobileNavBg};
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
`
const BenefitsTitle = styled.h4`
      color: ${(props) => props.theme.palette.primary.main};
      margin-bottom: 20px;
    }
`
const BenefitsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
const BenefitItem = styled.li`
    font-size: 14px;
    color: ${(props) => props.theme.palette.common.black};
    padding: 8px 0;
    padding-left: 28px;
    position: relative;
    display: flex;
    align-items: center;

    &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: ${(props) => props.theme.palette.primary.main};
        font-size: 18px;
        font-weight: bold;
    }
`
const ErrorBanner = styled.div`
    background: ${(props) => props.theme.mobile.error};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
`
const FormField = styled.div`
    margin-bottom: 16px;
`
const StyledTextField = styled(TextField)<{ error?: boolean }>`
    && {
        width: 100%;
        background: white;
        border-radius: 8px;

        .MuiOutlinedInput-root {
            border-radius: 8px;

            ${({ error }) =>
                error &&
                `
        fieldset {
          border-color: ${(props: any) => props.theme.mobile.error};
        }
      `}

            &:hover fieldset {
                border-color: ${(props) => props.theme.palette.primary.main};
            }

            &.Mui-focused fieldset {
                border-color: ${(props) => props.theme.palette.primary.main};
            }
        }
    }
`
const ErrorMessage = styled.div`
    color: ${(props) => props.theme.mobile.error};
    font-size: 12px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;

    &:before {
        content: "⊗";
        font-size: 16px;
    }
`

const partnershipSchema = z.object({
    orgName: z.string().min(1, "Organization name is required"),
    email: z.string().email("Valid email is required").min(1, "Contact email is required"),
    phone: z.string().min(1, "Phone number is required"),
    eventIdea: z.string().min(1, "Please tell us about your event idea"),
})

type PartnershipFormData = z.infer<typeof partnershipSchema>

const trainingPrograms = [
    "Financial Literacy programs for communities",
    "Corporate training on blockchain technology",
    "Digital skills workshop (computing, data analysis, coding, etc.)",
    "Youth empowerment programs",
]

const benefits = [
    "Access to expert instructors",
    "Proven training methodologies",
    "Flexible venue arrangements",
    "Comprehensive curriculum",
    "Certificate programs",
]

export default function HostEventsWithUs() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PartnershipFormData>({
        resolver: zodResolver(partnershipSchema),
        mode: "onBlur",
    })

    const hasErrors = Object.keys(errors).length > 0

    const onSubmit = async (data: PartnershipFormData) => {
        try {
            console.log("Partnership form submitted:", data)
            // Add your API call here
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("✅ Partnership request submitted successfully!")
            // alert("Partnership request submitted successfully!")
            reset()
        } catch (error) {
            console.log("Submit error:", error)
        }
    }

    return (
        <Container>
            <EventsTitle>Host Events With Us</EventsTitle>
            <EventsCard elevation={3}>
                <TrainingSection>
                    <TrainingTitle>Training & Workshops</TrainingTitle>
                    <TrainingList>
                        {trainingPrograms.map((program, index) => (
                            <TrainingItem key={index}>{program}</TrainingItem>
                        ))}
                    </TrainingList>
                </TrainingSection>

                <BenefitsSection>
                    <BenefitsTitle>Why Partner With Us?</BenefitsTitle>
                    <BenefitsList>
                        {benefits.map((benefit, index) => (
                            <BenefitItem key={index}>{benefit}</BenefitItem>
                        ))}
                    </BenefitsList>
                </BenefitsSection>

                {hasErrors && (
                    <ErrorBanner>
                        <span>⊗</span>
                        Please fix the errors in the form
                    </ErrorBanner>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <StyledTextField
                            {...register("orgName")}
                            placeholder="Organization Name"
                            variant="outlined"
                            size="small"
                            error={!!errors.orgName}
                        />
                        {errors.orgName && <ErrorMessage>{errors.orgName.message}</ErrorMessage>}
                    </FormField>

                    <FormField>
                        <StyledTextField
                            {...register("email")}
                            placeholder="Contact Email"
                            variant="outlined"
                            size="small"
                            type="email"
                            error={!!errors.email}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </FormField>

                    <FormField>
                        <StyledTextField
                            {...register("phone")}
                            placeholder="Phone number"
                            variant="outlined"
                            size="small"
                            error={!!errors.phone}
                        />
                        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                    </FormField>

                    <FormField>
                        <StyledTextField
                            {...register("eventIdea")}
                            placeholder="Tell us about the parntership. e.g. Strategic partner, Media partenr, Tech or Community partner etc."
                            variant="outlined"
                            multiline
                            rows={4}
                            error={!!errors.eventIdea}
                        />
                        {errors.eventIdea && (
                            <ErrorMessage>{errors.eventIdea.message}</ErrorMessage>
                        )}
                    </FormField>

                    <EnrollButton type="submit" disabled={isSubmitting} variant="contained">
                        {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                    </EnrollButton>
                </form>
            </EventsCard>
        </Container>
    )
}
