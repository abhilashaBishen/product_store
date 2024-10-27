import {
  Box,
  HStack,
  Image,
  Heading,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
  ModalFooter,

} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");

  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "ERROR",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        Description: message,
        Status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // const {updateProduct} = useProductStore()

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toast({
        title: "ERROR",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "product update succesfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };




  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color="red" mb={4}>
          {product.price}{" "}
        </Text>

        <HStack spacing={2}>
          {/* Calling onOpen when the Edit button is clicked */}
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange ={(e)=>setUpdatedProduct({...updateProduct, name: e.target.value})}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange ={(e)=>setUpdatedProduct({...updateProduct, price: e.target.value})}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange ={(e)=>setUpdatedProduct({...updateProduct, image: e.target.value})}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update Product
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
