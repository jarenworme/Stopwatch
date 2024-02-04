import { Button } from "@chakra-ui/react"

// button props to change styles between buttons as inputs in the render
interface PrimaryButtonProps{
    label: string,
    back: string,
    disableCondition: boolean,
    onClick: ()=>void
}


export default function StopWatchButton({label, back, disableCondition, onClick}:PrimaryButtonProps) {
    return(
        <>
            <Button
                mx="4%"
                w="90%"
                bg={back} 
                color="#eef0eb" 
                minH="3.5rem"
                onClick={onClick}
                _hover={{border: "none"}}
                isDisabled={(disableCondition)} 
                _disabled={{ opacity: '0.7', cursor: 'not-allowed'}}
            >
                {label}
            </Button>
        </>
    );
}
