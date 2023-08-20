import { useToast } from "@chakra-ui/toast";
import { Toast } from "../components";
import { ReactElement } from "react";

const useToasts = () => {
	const toast = useToast();

	return (title: string, description: string, duration: number, theme: string, icon?: ReactElement) => {
		toast({
			duration: duration,
			isClosable: true,
			position: "bottom",
			render: () => (
				<Toast
					title={title}
					description={description}
					theme={theme}
					icon={icon}
				/>
			)
		});
	};
};

export default useToasts;
