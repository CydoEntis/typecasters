import { Box, Image, Group, Paper, Text, Title } from "@mantine/core";
import LoginForm from "../../features/auth/LoginForm";
import Arrow from "../../assets/arrow.svg";
import classes from "./auth.module.css";

type Props = {};

function LoginPage({}: Props) {
	return (
		<Box
			w="100%"
			h="100vh"
			className={classes.bg}
		>
			{/* Title Text */}
			<Box
				pos="relative"
				className="top-20"
			>
				<Title
					size="3rem"
					ta="center"
					mb="xl"
				>
					Enter the Arcane Realm of TypeCasters
				</Title>
				<Text
					ta="center"
					size="lg"
				>
					—only the swiftest will survive!
				</Text>
			</Box>

			{/* Background Paper behind the form */}
			<Box
				pos="absolute"
				style={{
					left: "39%",
					top: "45%",
					transform: "translate(-50%, -50%) rotate(-2deg)",
				}}
			>
				<Text
					pos="absolute"
					style={{
						left: "30%",
						top: "15%",
						transform: "translate(-50%, -50%) rotate(30deg)",
					}}
					size="xl"
				>
					Join Now!
				</Text>
				<Image
					src={Arrow}
					w={300}
				/>
			</Box>
			<Paper
				bg="#371B6B"
				w={520}
				h={400}
				pos="absolute"
				radius="md"
				style={{
					left: "55%",
					top: "40%",
					transform: "translate(-50%, -50%) rotate(-2deg)",
				}}
				className="rotate-1"
			/>

			{/* Form and Text Below the Title */}
			<Box
				style={{
					position: "absolute",
					left: "55%",
					top: "40%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<Paper
					radius="md"
					p="xl"
					shadow="xl"
					w={500}
					bg="card"
					className="z-20"
				>
					<Text
						size="lg"
						fw={500}
						ta="center"
					>
						Join TypeCasters
					</Text>
					<Group
						grow
						mb="md"
						mt="md"
					/>
					<LoginForm />
				</Paper>
			</Box>
		</Box>
	);
}

export default LoginPage;
