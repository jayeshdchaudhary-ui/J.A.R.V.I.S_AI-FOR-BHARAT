import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, LogIn, UserPlus, Globe, Square, Phone, ArrowUp, Lightbulb, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    title: "Voice-Controlled Commands",
    description: "Control your assistant with simple voice commands. Activate features, manage devices, or get updates hands-free.",
    icon: <Lightbulb size={36} color="#00b7eb" />,
  },
  {
    title: "IoT Device Management",
    description: "Seamlessly connect and manage your IoT devices. Turn on lights, adjust thermostats, or monitor security systems with ease.",
    icon: <TrendingUp size={36} color="#00b7eb" />,
  },
  {
    title: "Task Scheduling",
    description: "Organize your day with intelligent task scheduling. Set reminders, create to-dos, and get notifications to stay on track.",
    path: "/MainLayout",
    icon: <Shield size={36} color="#00b7eb" />,
  },
  {
    title: "Personal Assistant Intelligence",
    description: "Get personalized assistance with AI-driven insights. From daily briefings to custom recommendations, your assistant adapts to you.",
    icon: <Lightbulb size={36} color="#00b7eb" />,
  },
  {
    title: "Custom Voice Feedback",
    description: "Hear responses in a voice that suits you. Customize the tone, accent, and style of your assistant’s voice feedback.",
    icon: <TrendingUp size={36} color="#00b7eb" />,
  },
  {
    title: "Real-time Chat with J.A.R.V.I.S",
    description: "Engage in real-time conversations with J.A.R.V.I.S. Ask questions, get instant answers, and enjoy a seamless chat experience.",
    icon: <Shield size={36} color="#00b7eb" />,
  },
];

// Inline styles for the LandingPage
const landingPageContainerStyle = {
  fontFamily: "'Space Mono', monospace",
  color: "#E8F2F8", // Slightly brighter text for contrast
  backgroundColor: "#050A10", // Deeper background
  minHeight: "100vh",
  overflowX: "hidden",
  lineHeight: 1.6,
  position: "relative",
  overflow: "hidden",
};

const backgroundEffectStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle at 50% 50%, rgba(0,191,255,0.06), rgba(0,0,0,0.88) 80%)", // Further refined, subtle glow
  zIndex: 0,
};

const contentWrapperStyle = {
  position: "relative",
  zIndex: 1,
};

const navbarStyle = (isMobile) => ({
  padding: isMobile ? "10px 15px" : "18px 60px", // Further reduced navbar padding
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(40, 40, 60, 0.6)",
  flexWrap: "wrap",
  gap: isMobile ? "12px" : "25px", // Further reduced navbar button gap
  backgroundColor: "rgba(5, 10, 16, 0.95)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  backdropFilter: "blur(12px)",
});

const navbarTitleStyle = (isMobile) => ({
  fontSize: isMobile ? "26px" : "36px", // Slightly smaller navbar title
  color: "#30D5FF",
  fontWeight: 700,
  textShadow: "0 0 10px rgba(48,213,255,0.6), 0 0 20px rgba(48,213,255,0.3)",
  letterSpacing: "1.5px", // Slightly reduced letter spacing
});

const navbarButtonsStyle = (isMobile) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  gap: isMobile ? "12px" : "20px", // Further reduced gap
  flexWrap: "wrap",
  width: isMobile ? "100%" : "auto",
});

const buttonBaseStyle = {
  backgroundColor: "#30D5FF",
  color: "#050A10",
  border: "none",
  padding: "10px 20px", // Further reduced button padding
  borderRadius: "6px", // Slightly smaller border-radius
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 0 10px rgba(48,213,255,0.4)",
  transition: "all 0.3s ease",
  fontSize: "15px", // Slightly smaller font size
  textTransform: "uppercase",
  letterSpacing: "0.7px",
};

const buttonHoverStyle = {
  transform: "scale(1.03) translateY(-1px)",
  boxShadow: "0 0 20px rgba(48,213,255,0.7), 0 0 35px rgba(48,213,255,0.3)",
  backgroundColor: "#00BFFF",
};

const heroSectionStyle = (isMobile) => ({
  padding: isMobile ? "70px 20px" : "120px 80px", // Further reduced hero section padding
  textAlign: "center",
  background: "transparent",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: isMobile ? "65vh" : "75vh", // Slightly reduced min-height
  color: "#E8F2F8",
  overflow: "hidden",
});

const heroBackgroundOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle at 50% 50%, rgba(0,191,255,0.05), rgba(0,0,0,0.9) 85%)", // Slightly softer glow, wider falloff
  zIndex: -1,
};

const heroContentStyle = (isMobile) => ({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  alignItems: "center",
  justifyContent: isMobile ? "center" : "space-between",
  width: "100%",
  maxWidth: "1100px", // Slightly reduced max-width for content
  gap: isMobile ? "25px" : "50px", // Further reduced gap
  textAlign: isMobile ? "center" : "left",
});

const heroTextStyle = (isMobile) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isMobile ? "center" : "flex-start",
  maxWidth: isMobile ? "100%" : "50%", // Text takes up even less space on desktop
});

const heroTitleStyle = (isMobile) => ({
  fontSize: isMobile ? "38px" : "clamp(45px, 6vw, 70px)", // Slightly smaller hero title
  marginBottom: isMobile ? "15px" : "20px", // Reduced margin
  color: "#30D5FF",
  textShadow: "0 0 15px rgba(48,213,255,0.6), 0 0 30px rgba(48,213,255,0.3)",
  lineHeight: 1.1,
  fontWeight: 800,
  letterSpacing: isMobile ? "1.5px" : "3px", // Reduced letter spacing
  display: "flex",
  flexWrap: "wrap",
  justifyContent: isMobile ? "center" : "flex-start",
});

const animatedTitleCharStyle = (index) => ({
  display: "inline-block",
  opacity: 0,
  transform: "translateY(12px) scale(0.92)", // Slightly smaller transform
  animation: `fadeInUp 0.6s ease-out ${index * 0.03}s forwards`,
});

const heroSubtitleStyle = (isMobile) => ({
  maxWidth: isMobile ? "90%" : "auto",
  margin: isMobile ? "0 auto 30px" : "0 0 40px 0", // Reduced margin
  fontSize: isMobile ? "16px" : "clamp(18px, 2vw, 20px)", // Slightly smaller subtitle
  color: "#A0DDE6",
  lineHeight: 1.6,
  opacity: 0,
  animation: "fadeIn 0.8s ease-out 1.3s forwards",
});

const heroImageContainerStyle = (isMobile) => ({
  width: isMobile ? "70%" : "40%", // Slightly smaller image container
  maxWidth: isMobile ? "280px" : "400px", // Slightly reduced max-width
  aspectRatio: "1 / 1",
  background: "radial-gradient(circle at center, rgba(48,213,255,0.25) 0%, rgba(5,10,16,0) 75%)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 40px rgba(48,213,255,0.35), inset 0 0 25px rgba(48,213,255,0.18)",
  opacity: 0,
  animation: "fadeInScale 0.9s ease-out 2s forwards",
});

const heroImageStyle = {
  width: "85%", // Slightly larger image within container
  height: "85%",
  objectFit: "contain",
  filter: "drop-shadow(0 0 12px rgba(48,213,255,0.7))",
};

const callToActionButtonStyle = (isMobile) => ({
  ...buttonBaseStyle,
  padding: isMobile ? "16px 30px" : "17px 40px",
  fontSize: isMobile ? "17px" : "19px",
  borderRadius: "8px",
  fontWeight: 700,
  boxShadow: "0 0 20px rgba(48,213,255,0.6)",
  background: "linear-gradient(45deg, #30D5FF, #00BFFF)",
  color: "#050A10",
  opacity: 0,
  animation: "fadeInScale 0.7s ease-out 1.8s forwards",
});

const callToActionButtonHoverStyle = {
  transform: "scale(1.05) translateY(-2px)",
  boxShadow: "0 0 30px rgba(48,213,255,0.8), 0 0 60px rgba(48,213,255,0.4)",
  background: "linear-gradient(45deg, #00BFFF, #30D5FF)",
};

const featuresSectionStyle = (isMobile) => ({
  padding: isMobile ? "70px 20px" : "120px 80px",
  background: "linear-gradient(180deg, #050A10, #101B2E)", // Deeper and slightly varied gradient
  position: "relative",
  zIndex: 1,
});

const featuresTitleStyle = (isMobile) => ({
  textAlign: "center",
  fontSize: isMobile ? "34px" : "clamp(40px, 5vw, 60px)",
  color: "#30D5FF", // Brighter blue
  marginBottom: isMobile ? "50px" : "70px",
  textShadow: "0 0 12px rgba(48,213,255,0.6)", // Adjusted shadow
  fontWeight: 700,
});

const featureCardGridStyle = (isMobile) => ({
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
  gap: isMobile ? "25px" : "40px",
  maxWidth: "1100px",
  margin: "0 auto",
});

const featureCardStyle = (isMobile) => ({
  background: "linear-gradient(145deg, #101B2E, #0A141F)", // Deeper, more subtle card background
  border: "1px solid rgba(48,213,255,0.2)", // Softer border
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 0 15px rgba(48,213,255,0.1)", // Adjusted shadow
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
});

const featureCardHoverStyle = {
  transform: "translateY(-8px) scale(1.01)",
  boxShadow: "0 0 30px rgba(48,213,255,0.3), 0 0 60px rgba(48,213,255,0.15)", // Adjusted shadow
  borderColor: "#30D5FF", // Brighter border on hover
};

const featureIconContainerStyle = {
  marginBottom: "20px",
  padding: "15px",
  borderRadius: "50%",
  background: "rgba(48,213,255,0.1)", // Adjusted background
  border: "1px solid rgba(48,213,255,0.25)", // Adjusted border
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const featureTitleCardStyle = (isMobile) => ({
  fontSize: isMobile ? "22px" : "24px",
  color: "#30D5FF", // Brighter blue
  marginBottom: "15px",
  textShadow: "0 0 7px rgba(48,213,255,0.4)", // Adjusted shadow
  fontWeight: 600,
});

const featureDescriptionCardStyle = (isMobile) => ({
  fontSize: isMobile ? "15px" : "16px",
  color: "#A0DDE6", // Slightly lighter blue
  lineHeight: 1.7,
});

const footerStyle = {
  padding: "40px 20px",
  textAlign: "center",
  color: "#8899AA", // Softer grey
  borderTop: "1px solid #1A253A", // Deeper border
  fontSize: "14px",
  backgroundColor: "#050A10", // Matches new background
  position: "relative",
  zIndex: 1,
};

const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.95)", // More opaque background
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000,
  backdropFilter: "blur(8px)", // Slightly more blur
};

const popupContentStyle = (isMobile) => ({
  background: "linear-gradient(135deg, #0A141F, #050A10)", // Deeper gradient for popup
  padding: isMobile ? "30px 25px" : "40px 35px",
  borderRadius: "12px",
  width: isMobile ? "90%" : "450px",
  border: "1px solid #30D5FF", // Brighter blue border
  boxShadow: "0 0 30px rgba(48,213,255,0.4), inset 0 0 15px rgba(48,213,255,0.15)", // Adjusted shadow
  fontFamily: "'Space Mono', monospace",
  color: "#E8F2F8", // Matches container text color
  position: "relative",
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflowY: "auto",
});

const popupCloseButtonStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "none",
  border: "none",
  color: "#30D5FF", // Brighter blue
  cursor: "pointer",
  fontSize: "26px",
  transition: "transform 0.2s ease-out, color 0.2s ease-out",
};

const popupCloseButtonHoverStyle = {
  transform: "rotate(90deg) scale(1.08)",
  color: "#00BFFF", // Slightly different blue on hover
};

const popupTitleStyle = (isMobile) => ({
  marginBottom: isMobile ? "25px" : "35px",
  textAlign: "center",
  fontSize: isMobile ? "26px" : "34px",
  fontWeight: 700,
  color: "#30D5FF", // Brighter blue
  textShadow: "0 0 8px rgba(48,213,255,0.6)", // Adjusted shadow
});

const formGroupStyle = {
  marginBottom: "20px",
};

const formLabelStyle = (isMobile) => ({
  display: "block",
  marginBottom: "8px",
  fontSize: isMobile ? "14px" : "16px",
  color: "#A0DDE6", // Slightly lighter blue
});

const formInputStyle = (isMobile) => ({
  width: "100%",
  padding: isMobile ? "10px" : "12px",
  background: "#0D1A2E", // Darker input background
  color: "#E8F2F8", // Matches container text color
  border: "1px solid #00BFFF", // Brighter blue border
  borderRadius: "6px",
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "14px" : "16px",
  boxShadow: "inset 0 0 6px rgba(0,191,255,0.25)", // Adjusted shadow
});

const submitButtonStyle = (isMobile) => ({
  width: "100%",
  padding: isMobile ? "12px" : "14px",
  background: "linear-gradient(90deg, #30D5FF, #00BFFF)", // Adjusted gradient
  color: "#050A10", // Matches new background
  border: "none",
  borderRadius: "7px",
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "16px" : "18px",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 20px rgba(48,213,255,0.5)", // Adjusted shadow
  transition: "all 0.3s ease",
  textTransform: "uppercase",
});

const submitButtonHoverStyle = {
  transform: "scale(1.01) translateY(-1px)",
  boxShadow: "0 0 30px rgba(48,213,255,0.7), 0 0 60px rgba(48,213,255,0.3)", // Adjusted shadow
};

const dividerStyle = {
  display: "flex",
  alignItems: "center",
  margin: "25px 0",
  color: "#30D5FF", // Brighter blue
  fontSize: "15px",
  textTransform: "uppercase",
};

const dividerLineStyle = {
  flex: 1,
  height: "1px",
  background: "linear-gradient(90deg, rgba(48,213,255,0.1), #30D5FF, rgba(48,213,255,0.1))", // Adjusted gradient
  opacity: 0.7,
};

const dividerSpanStyle = {
  margin: "0 15px",
  fontWeight: 600,
};

const socialButtonBaseStyle = (isMobile) => ({
  width: "100%",
  padding: isMobile ? "10px" : "12px",
  background: "rgba(48,213,255,0.08)", // Adjusted background
  color: "#30D5FF", // Brighter blue
  border: "1px solid rgba(48,213,255,0.3)", // Adjusted border
  borderRadius: "7px",
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "14px" : "15px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "12px",
  transition: "all 0.3s ease",
  boxShadow: "0 0 12px rgba(48,213,255,0.15)", // Adjusted shadow
  fontWeight: 500,
});

const socialButtonHoverStyle = {
  transform: "scale(1.01) translateX(3px)",
  boxShadow: "0 0 20px rgba(48,213,255,0.3)", // Adjusted shadow
  borderColor: "#00BFFF", // Slightly different blue on hover
};

const socialButtonSvgStyle = {
  marginRight: "12px",
};

const phoneInputGroupStyle = {
  marginBottom: "20px",
  display: "flex",
  gap: "10px",
};

const countrySelectStyle = (isMobile) => ({
  width: "100px",
  padding: isMobile ? "10px" : "12px",
  background: "#0D1A2E", // Darker input background
  color: "#E8F2F8", // Matches container text color
  border: "1px solid #00BFFF", // Brighter blue border
  borderRadius: "6px",
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "14px" : "16px",
  boxShadow: "inset 0 0 6px rgba(0,191,255,0.25)", // Adjusted shadow
});

const phoneInputStyle = (isMobile) => ({
  flex: 1,
  padding: isMobile ? "10px" : "12px",
  background: "#0D1A2E", // Darker input background
  color: "#E8F2F8", // Matches container text color
  border: "1px solid #00BFFF", // Brighter blue border
  borderRadius: "6px",
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "14px" : "16px",
  boxShadow: "inset 0 0 6px rgba(0,191,255,0.25)", // Adjusted shadow
});

const otpInputsStyle = {
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const otpInputStyle = (isMobile) => ({
  width: isMobile ? "38px" : "45px",
  height: isMobile ? "38px" : "45px",
  textAlign: "center",
  background: "#0D1A2E", // Darker input background
  color: "#30D5FF", // Brighter blue
  border: "1px solid #00BFFF", // Brighter blue border
  borderRadius: "6px",
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "18px" : "20px",
  fontWeight: 600,
  boxShadow: "inset 0 0 8px rgba(0,191,255,0.3)", // Adjusted shadow
});

const otpResendTimerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
};

const resendOtpButtonStyle = (otpTimer, isMobile) => ({
  background: "none",
  border: "none",
  color: otpTimer > 0 ? "#778899" : "#30D5FF", // Softer grey for disabled, brighter blue for enabled
  fontFamily: "'Space Mono', monospace",
  fontSize: isMobile ? "13px" : "15px",
  cursor: otpTimer > 0 ? "not-allowed" : "pointer",
  textDecoration: "underline",
  transition: "color 0.2s ease",
});

const resendOtpButtonHoverStyle = {
  color: "#00BFFF", // Slightly different blue on hover
};

const otpTimerTextStyle = (isMobile) => ({
  fontSize: isMobile ? "13px" : "15px",
  color: "#A0DDE6", // Slightly lighter blue
});

const scrollToTopButtonStyle = {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  background: "#30D5FF", // Brighter blue
  color: "#050A10", // Matches new background
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  cursor: "pointer",
  boxShadow: "0 0 12px rgba(48,213,255,0.6)", // Adjusted shadow
  transition: "all 0.3s ease",
  opacity: 0,
  visibility: "hidden",
  zIndex: 1000,
};

const scrollToTopButtonHoverStyle = {
  transform: "translateY(-8px) scale(1.1)",
  boxShadow: "0 0 25px rgba(48,213,255,0.8)", // Adjusted shadow
  background: "#00BFFF", // Slightly different blue on hover
};

const scrollToTopButtonShowStyle = {
  opacity: 1,
  visibility: "visible",
  transform: "translateY(-5px)",
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRefs = [React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null)];
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredSocialButton, setHoveredSocialButton] = useState(null);
  const [hoveredCloseButton, setHoveredCloseButton] = useState(null);
  const [hoveredSubmitButton, setHoveredSubmitButton] = useState(null);
  const [hoveredResendButton, setHoveredResendButton] = useState(null);
  const [hoveredScrollButton, setHoveredScrollButton] = useState(null);
  const [hoveredFeatureCard, setHoveredFeatureCard] = useState(null);
  const featureCardRefs = useRef([]);
  const [visibleFeatureCards, setVisibleFeatureCards] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleFeatureCards((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    featureCardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      featureCardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [features]); // Re-run if features array changes

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Login success
      alert(data.message || "Login successful!"); // Use server message
      localStorage.setItem("token", data.token);
      
      // Optional: Store user data if returned
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      setIsLoginPopupOpen(false);
      
      // Optional: Refresh or redirect
      window.location.reload(); // Or use react-router navigation
    } else {
      // Login failed (server returned error)
      const errorMessage = data.message || "Invalid username or password";
      alert(`Login failed: ${errorMessage}`);
      
      // Optional: Clear password field for security
      setLoginPassword("");
    }
  } catch (err) {
    console.error("Login error:", err);
    
    // Differentiate between network errors and other errors
    if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
      alert("Network error - please check your connection");
    } else {
      alert("Login request failed. Please try again later.");
    }
  }
};


  const handleGoogleLogin = () => {
    alert("Logged in with Google as user@example.com");
    setIsLoginPopupOpen(false);
  };

  const handleMicrosoftLogin = () => {
    alert("Logged in with Microsoft as user@outlook.com");
    setIsLoginPopupOpen(false);
  };

  const handlePhoneLogin = () => {
    setIsLoginPopupOpen(false);
    setIsPhonePopupOpen(true);
  };

  const handlePhoneVerify = () => {
    setIsPhonePopupOpen(false);
    setIsOtpPopupOpen(true);
    setOtpTimer(60);
  };

  const handleOtpVerify = () => {
    alert("Phone number verified successfully!");
    setIsOtpPopupOpen(false);
  };

  const handleResendOtp = () => {
    alert("OTP resent successfully!");
    setOtpTimer(60);
  };

  const handleSignup = async () => {
  try {
    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "yourUsername",
        email: "your@email.com",
        password: "yourPassword",
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      setOtpTimer(60);
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Error during signup");
  }
};


  React.useEffect(() => {
    let timer;
    if (isOtpPopupOpen && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpPopupOpen, otpTimer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current.focus();
    }
  };

  return (
    <div style={landingPageContainerStyle}>
      <div style={backgroundEffectStyle}></div>
      <div style={contentWrapperStyle}>
      {/* Navbar */}
        <header style={navbarStyle(isMobile)}>
          <h1 style={navbarTitleStyle(isMobile)}>J.A.R.V.I.S</h1>
          <div style={navbarButtonsStyle(isMobile)}>
          <button
            onClick={() => navigate("/hologramOrb")}
              style={{ ...buttonBaseStyle, ...(hoveredButton === 'launch' && buttonHoverStyle) }}
              onMouseEnter={() => setHoveredButton('launch')}
              onMouseLeave={() => setHoveredButton(null)}
          >
            Launch Assistant
          </button>
          <button
            onClick={() => navigate("/chatbot")}
              style={{ ...buttonBaseStyle, ...(hoveredButton === 'chatbot' && buttonHoverStyle) }}
              onMouseEnter={() => setHoveredButton('chatbot')}
              onMouseLeave={() => setHoveredButton(null)}
          >
            Open Chatbot
          </button>
          <button
            onClick={() => setIsLoginPopupOpen(true)}
              style={{ ...buttonBaseStyle, ...(hoveredButton === 'login' && buttonHoverStyle) }}
              onMouseEnter={() => setHoveredButton('login')}
              onMouseLeave={() => setHoveredButton(null)}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignupPopupOpen(true)}
              style={{ ...buttonBaseStyle, ...(hoveredButton === 'signup' && buttonHoverStyle) }}
              onMouseEnter={() => setHoveredButton('signup')}
              onMouseLeave={() => setHoveredButton(null)}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
        <section style={heroSectionStyle(isMobile)}>
          <div style={heroBackgroundOverlayStyle}></div>
          <div style={heroContentStyle(isMobile)}>
            <div style={heroTextStyle(isMobile)}>
              <h2 style={heroTitleStyle(isMobile)}>
                {"Your AI Assistant, ".split("").map((char, index) => (
                  <span key={index} style={animatedTitleCharStyle(index)}>
                    {char}
                  </span>
                ))}
                <span style={{ color: "#00B7EB" }}>
                  {"Reimagined".split("").map((char, index) => (
                    <span key={index} style={animatedTitleCharStyle(index + "Your AI Assistant, ".length)}>
                      {char}
                    </span>
                  ))}
                </span>
        </h2>
              <p style={heroSubtitleStyle(isMobile)}>
                J.A.R.V.I.S is an advanced intelligent system designed for seamless interaction and automation.
                Experience the future of personal and device management, all controlled with your voice.
        </p>
        <button
          onClick={() => navigate("/hologramOrb")}
                style={{ ...buttonBaseStyle, ...callToActionButtonStyle(isMobile), ...(hoveredButton === 'getStarted' && callToActionButtonHoverStyle) }}
                onMouseEnter={() => setHoveredButton('getStarted')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Get Started Now
        </button>
            </div>
            <div style={heroImageContainerStyle(isMobile)}>
              <img src="/ai-abstract-graphic.png" alt="AI Abstract Graphic" style={heroImageStyle} />
            </div>
          </div>
      </section>

        {/* Features Section */}
        <section style={featuresSectionStyle(isMobile)}>
          <h2 style={featuresTitleStyle(isMobile)}>
            Explore <span style={{ color: "#00B7EB" }}>J.A.R.V.I.S</span> Features
        </h2>
          <div style={featureCardGridStyle(isMobile)}>
        {features.map((feature, index) => {
                const isVisible = visibleFeatureCards[index];
                const animatedCardStyle = {
                  transition: "all 0.6s ease-out",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                };
          return (
            <div
              key={index}
                  ref={(el) => (featureCardRefs.current[index] = el)}
                  data-index={index}
              style={{
                    ...featureCardStyle(isMobile),
                    ...(hoveredFeatureCard === index && featureCardHoverStyle),
                    ...animatedCardStyle,
                    cursor: feature.path ? 'pointer' : 'default',
                  }}
                  onMouseEnter={() => setHoveredFeatureCard(index)}
                  onMouseLeave={() => setHoveredFeatureCard(null)}
                  onClick={() => feature.path && navigate(feature.path)}
                >
                  <div style={featureIconContainerStyle}>{feature.icon}</div>
                  <h3 style={featureTitleCardStyle(isMobile)}>{feature.title}</h3>
                  <p style={featureDescriptionCardStyle(isMobile)}>{feature.description}</p>
            </div>
          );
        })}
          </div>
      </section>

      {/* Footer */}
        <footer style={footerStyle}>
        Made by Jayesh ⚡ Powered by AI
      </footer>
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle(isMobile)}>
            <button
              onClick={() => setIsLoginPopupOpen(false)}
              style={{ ...popupCloseButtonStyle, ...(hoveredCloseButton === 'login' && popupCloseButtonHoverStyle) }}
              onMouseEnter={() => setHoveredCloseButton('login')}
              onMouseLeave={() => setHoveredCloseButton(null)}
            >
              <X size={24} />
            </button>
            <h3 style={popupTitleStyle(isMobile)}>J.A.R.V.I.S Login</h3>
            <div style={formGroupStyle}>
              <label style={formLabelStyle(isMobile)}>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                style={formInputStyle(isMobile)}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle(isMobile)}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={formInputStyle(isMobile)}
              />
            </div>
            <button
              onClick={handleLogin}
              style={{ ...submitButtonStyle(isMobile), ...(hoveredSubmitButton === 'login' && submitButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSubmitButton('login')}
              onMouseLeave={() => setHoveredSubmitButton(null)}
            >
              Login
            </button>

            <div style={dividerStyle}>
              <div style={dividerLineStyle}></div>
              <span style={dividerSpanStyle}>OR</span>
              <div style={dividerLineStyle}></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              style={{ ...socialButtonBaseStyle(isMobile), ...(hoveredSocialButton === 'google' && socialButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSocialButton('google')}
              onMouseLeave={() => setHoveredSocialButton(null)}
            >
              <Globe size={20} style={socialButtonSvgStyle} />
              Continue with Google
            </button>

            <button
              onClick={handleMicrosoftLogin}
              style={{ ...socialButtonBaseStyle(isMobile), ...(hoveredSocialButton === 'microsoft' && socialButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSocialButton('microsoft')}
              onMouseLeave={() => setHoveredSocialButton(null)}
            >
              <Square size={20} style={socialButtonSvgStyle} />
              Continue with Microsoft
            </button>

            <button
              onClick={handlePhoneLogin}
              style={{ ...socialButtonBaseStyle(isMobile), ...(hoveredSocialButton === 'phone' && socialButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSocialButton('phone')}
              onMouseLeave={() => setHoveredSocialButton(null)}
            >
              <Phone size={20} style={socialButtonSvgStyle} />
              Continue with Phone Number
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Popup */}
      {isSignupPopupOpen && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle(isMobile)}>
            <button
              onClick={() => setIsSignupPopupOpen(false)}
              style={{ ...popupCloseButtonStyle, ...(hoveredCloseButton === 'signup' && popupCloseButtonHoverStyle) }}
              onMouseEnter={() => setHoveredCloseButton('signup')}
              onMouseLeave={() => setHoveredCloseButton(null)}
            >
              <X size={24} />
            </button>
            <h3 style={popupTitleStyle(isMobile)}>J.A.R.V.I.S Sign Up</h3>
            <div style={formGroupStyle}>
              <label style={formLabelStyle(isMobile)}>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                style={formInputStyle(isMobile)}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle(isMobile)}>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                style={formInputStyle(isMobile)}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={formLabelStyle(isMobile)}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                style={formInputStyle(isMobile)}
              />
            </div>
            <button
              onClick={handleSignup}
              style={{ ...submitButtonStyle(isMobile), ...(hoveredSubmitButton === 'signup' && submitButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSubmitButton('signup')}
              onMouseLeave={() => setHoveredSubmitButton(null)}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Phone Number Popup */}
      {isPhonePopupOpen && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle(isMobile)}>
            <button
              onClick={() => setIsPhonePopupOpen(false)}
              style={{ ...popupCloseButtonStyle, ...(hoveredCloseButton === 'phone' && popupCloseButtonHoverStyle) }}
              onMouseEnter={() => setHoveredCloseButton('phone')}
              onMouseLeave={() => setHoveredCloseButton(null)}
            >
              <X size={24} />
            </button>
            <h3 style={popupTitleStyle(isMobile)}>Enter Phone Number</h3>
            <div style={phoneInputGroupStyle}>
              <select style={countrySelectStyle(isMobile)}>
                <option value="+91">India (+91)</option>
                <option value="+1">USA (+1)</option>
                <option value="+44">UK (+44)</option>
                <option value="+81">Japan (+81)</option>
                <option value="+86">China (+86)</option>
              </select>
              <input
                type="tel"
                placeholder="Enter phone number"
                style={phoneInputStyle(isMobile)}
              />
            </div>
            <button
              onClick={handlePhoneVerify}
              style={{ ...submitButtonStyle(isMobile), ...(hoveredSubmitButton === 'phone' && submitButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSubmitButton('phone')}
              onMouseLeave={() => setHoveredSubmitButton(null)}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* OTP Verification Popup */}
      {isOtpPopupOpen && (
        <div style={popupOverlayStyle}>
          <div style={popupContentStyle(isMobile)}>
            <button
              onClick={() => setIsOtpPopupOpen(false)}
              style={{ ...popupCloseButtonStyle, ...(hoveredCloseButton === 'otp' && popupCloseButtonHoverStyle) }}
              onMouseEnter={() => setHoveredCloseButton('otp')}
              onMouseLeave={() => setHoveredCloseButton(null)}
            >
              <X size={24} />
            </button>
            <h3 style={popupTitleStyle(isMobile)}>OTP Verification</h3>
            <div style={otpInputsStyle}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  ref={otpInputRefs[index]}
                  style={otpInputStyle(isMobile)}
                />
              ))}
            </div>
            <div style={otpResendTimerStyle}>
              <button
                onClick={handleResendOtp}
                disabled={otpTimer > 0}
                style={{ ...resendOtpButtonStyle(otpTimer, isMobile), ...(hoveredResendButton === 'resend' && resendOtpButtonHoverStyle) }}
                onMouseEnter={() => setHoveredResendButton('resend')}
                onMouseLeave={() => setHoveredResendButton(null)}
              >
                Resend OTP
              </button>
              <span style={otpTimerTextStyle(isMobile)}>
                {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Timer expired"}
              </span>
            </div>
            <button
              onClick={handleOtpVerify}
              style={{ ...submitButtonStyle(isMobile), ...(hoveredSubmitButton === 'otp' && submitButtonHoverStyle) }}
              onMouseEnter={() => setHoveredSubmitButton('otp')}
              onMouseLeave={() => setHoveredSubmitButton(null)}
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          style={{ ...scrollToTopButtonStyle, ...scrollToTopButtonShowStyle, ...(hoveredScrollButton && scrollToTopButtonHoverStyle) }}
          onMouseEnter={() => setHoveredScrollButton(true)}
          onMouseLeave={() => setHoveredScrollButton(false)}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default LandingPage;