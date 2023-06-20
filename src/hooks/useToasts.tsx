import React from "react";
import { useToast } from "@chakra-ui/toast";
import { Toast } from "../components";

const UseToasts = () => {
	const toast = useToast();

	return (title: string, description: string, duration: number, theme: string) => {
		toast({
			duration: duration,
			isClosable: true,
			position: "bottom",
			render: () => (
				<Toast
					title={title}
					description={description}
					theme={theme}
				/>
			)
		});
	};
};

export default UseToasts;
