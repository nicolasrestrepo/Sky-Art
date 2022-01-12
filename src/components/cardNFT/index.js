import { Card, Button, Text, Row, Col } from "@nextui-org/react";

export default function CardNFT({ image, actions, ...props }) {
    console.log('image', image);
    
  return (
    <Card 
      width="100%" 
      height="30vh" 
      color="#f6f6f6" 
      {...props}
    >
      <Card.Image
        autoResize={true}
        src={image}
        height={400}
        width="100%"
        alt="NFT"
      />
      {actions && (
        <Card.Footer
          border
          borderColor="rgba(255, 255, 255, 0.2)"
          style={{ position: "absolute", zIndex: 1, bottom: 0 }}
        >
          <Row>
            {actions?.map(({ title, onClick, color, isLoading }) => (
              <Col>
                <Button
                  loaderType="default"
                  auto
                  rounded
                  onClick={onClick}
                  color={color}
                  loading={isLoading}
                >
                  <Text size={12} weight="bold" transform="uppercase">
                    {title}
                  </Text>
                </Button>
              </Col>
            ))}
          </Row>
        </Card.Footer>
      )}
    </Card>
  );
}
