import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography, Button, Container } from "@mui/material";

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)",
  color: "white",
  padding: theme.spacing(15, 0),
  textAlign: "center",
  marginBottom: theme.spacing(8),
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
  },
}));

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartCooking = () => {
    navigate("/cooking");
  };

  return (
    <Box>
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            요리 레시피 AI
          </Typography>
          <Typography variant="h5" gutterBottom>
            AI와 함께 새로운 요리를 만들어보세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartCooking}
            sx={{
              mt: 4,
              backgroundColor: "white",
              color: "#FF6B6B",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            요리 시작하기
          </Button>
        </Container>
      </HeroSection>

      <Container>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box sx={{ flex: "1 1 300px" }}>
            <FeatureCard elevation={3}>
              <Typography variant="h4" gutterBottom>
                🍳
              </Typography>
              <Typography variant="h6" gutterBottom>
                AI 레시피 추천
              </Typography>
              <Typography>
                당신의 취향과 냉장고 재료를 기반으로 맞춤형 레시피를
                추천해드립니다.
              </Typography>
            </FeatureCard>
          </Box>
          <Box sx={{ flex: "1 1 300px" }}>
            <FeatureCard elevation={3}>
              <Typography variant="h4" gutterBottom>
                📝
              </Typography>
              <Typography variant="h6" gutterBottom>
                단계별 가이드
              </Typography>
              <Typography>
                상세한 조리 방법과 팁을 통해 완벽한 요리를 만들어보세요.
              </Typography>
            </FeatureCard>
          </Box>
          <Box sx={{ flex: "1 1 300px" }}>
            <FeatureCard elevation={3}>
              <Typography variant="h4" gutterBottom>
                🎯
              </Typography>
              <Typography variant="h6" gutterBottom>
                맞춤형 조언
              </Typography>
              <Typography>
                AI가 실시간으로 요리 과정을 안내하고 조언해드립니다.
              </Typography>
            </FeatureCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
