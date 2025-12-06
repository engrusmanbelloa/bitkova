import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import styled from "styled-components"
import { Typography, TextField, MenuItem, Select, FormControl, Button } from "@mui/material"
import { toast } from "sonner"
import EnrollButton from "@/components/EnrollButton"
import { mobile, ipad } from "@/responsive"

const Container = styled.div`
    width: ${(props) => props.theme.widths.heroWidth};
    padding: 0;
    margin: 0 auto;
    padding: 32px 24px;
    background: ${(props) => props.theme.mobile.mobileNavBg};
    border-radius: 12px;
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
const Title = styled.h2`
    color: ${(props) => props.theme.palette.common.black};
    text-align: center;
    margin-bottom: 5px;
`
const Subtitle = styled.p`
    color: ${(props) => props.theme.palette.common.black};
    text-align: center;
    margin-bottom: 20px;
`
const ErrorBanner = styled.div`
    background: ${(props) => props.theme.mobile.error};
    color: ${(props) => props.theme.palette.common.white};
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
const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.common.black};
    margin-bottom: 6px;
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
const StyledSelect = styled(Select)<{ error?: boolean }>`
    && {
        width: 100%;
        background: white;
        border-radius: 8px;

        ${({ error }) =>
            error &&
            `
      .MuiOutlinedInput-notchedOutline {
        border-color: ${(props: any) => props.theme.mobile.error};
      }
    `}

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: ${(props) => props.theme.palette.primary.main};
        }

        &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: ${(props) => props.theme.palette.primary.main};
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
const DisclaimerText = styled.p`
    color: ${(props) => props.theme.mobile.ash};
    text-align: center;
    margin-top: 12px;
    line-height: 1.4;
`

const quoteSchema = z.object({
    orgName: z.string().min(1, "Organization name is required"),
    email: z.string().email("Email address is required").min(1, "Email address is required"),
    phone: z.string().min(1, "Phone number is required"),
    service: z.string().min(1, "Please select a service"),
    details: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

export default function RequestQuote() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
        mode: "onBlur",
    })

    const serviceValue = watch("service", "")
    const hasErrors = Object.keys(errors).length > 0

    const onSubmit = async (data: QuoteFormData) => {
        try {
            console.log("Form submitted:", data)
            // Add your API call here
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("✅ Quote request submitted successfully!")
            reset() // Reset form after successful submission
        } catch (error) {
            console.error("Submit error:", error)
            toast.error("❌ Failed to submit request. Please try again.")
        }
    }

    return (
        <Container>
            <Title>Request a Quote</Title>
            <Subtitle>Fill out the form and we'll get back to you shortly</Subtitle>

            {hasErrors && (
                <ErrorBanner>
                    <span>⊗</span>
                    Please fix the errors in the form
                </ErrorBanner>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                    <Label>Organization Name:</Label>
                    <StyledTextField
                        {...register("orgName")}
                        placeholder="Your organization name"
                        variant="outlined"
                        size="small"
                        error={!!errors.orgName}
                    />
                    {errors.orgName && <ErrorMessage>{errors.orgName.message}</ErrorMessage>}
                </FormField>

                <FormField>
                    <Label>Email Address:</Label>
                    <StyledTextField
                        {...register("email")}
                        placeholder="Your.email@example.com"
                        variant="outlined"
                        size="small"
                        type="email"
                        error={!!errors.email}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </FormField>

                <FormField>
                    <Label>Phone Number:</Label>
                    <StyledTextField
                        {...register("phone")}
                        placeholder="+234 800 000 0000"
                        variant="outlined"
                        size="small"
                        error={!!errors.phone}
                    />
                    {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                </FormField>

                <FormField>
                    <Label>Select Service:</Label>
                    <FormControl fullWidth error={!!errors.service}>
                        <StyledSelect
                            {...register("service")}
                            value={serviceValue}
                            displayEmpty
                            size="small"
                            error={!!errors.service}
                        >
                            <MenuItem value="" disabled>
                                Choose a Service
                            </MenuItem>
                            <MenuItem value="web">Web & App Development</MenuItem>
                            <MenuItem value="blockchain">Blockchain Development</MenuItem>
                            <MenuItem value="design">Graphics & UI/UX Design</MenuItem>
                        </StyledSelect>
                    </FormControl>
                    {errors.service && <ErrorMessage>{errors.service.message}</ErrorMessage>}
                </FormField>

                <FormField>
                    <Label>Project Details</Label>
                    <StyledTextField
                        {...register("details")}
                        placeholder="Tell us about your project........"
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </FormField>
                <EnrollButton type="submit" disabled={isSubmitting} variant="contained">
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </EnrollButton>

                <DisclaimerText>
                    By submitting, you agree to our terms of service and privacy policy
                </DisclaimerText>
            </form>
        </Container>
    )
}
