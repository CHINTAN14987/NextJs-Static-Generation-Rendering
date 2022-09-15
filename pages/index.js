import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { Row, Col, Card } from "antd";
import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";

function HomePage(props) {
  return (
    <Row>
      {props.products.map((item) => {
        const { id, myName, img, phone, email, website } = item;
        return (
          <Col span={6} xs={24} sm={24} md={8} lg={8} xl={6} key={id}>
            <Card
              style={{ margin: "15px" }}
              cover={
                <div
                  style={{
                    background: "#ececec",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt="/"
                    src={img}
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  />
                </div>
              }
              actions={[
                <div className="container">
                  <Link href={`/${item.id}`}>
                    <h3 className="heading_Explore">Explore More....!</h3>
                  </Link>
                </div>,
              ]}
            >
              <h3>{myName}</h3>
              <div style={{ marginBottom: "10px" }}>
                <MailOutlined style={{ fontSize: "20px" }} />

                <span style={{ margin: "10px", color: "#000000a6" }}>
                  {email}
                </span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <PhoneOutlined style={{ fontSize: "20px" }} />
                <span style={{ margin: "10px", color: "#000000a6" }}>
                  {phone}
                </span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <GlobalOutlined style={{ fontSize: "20px" }} />

                <span style={{ margin: "10px", color: "#000000a6" }}>
                  {website}
                </span>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
    // <ul>
    //   {props.products.map((item) => {
    //     return (
    //       <div key={item.id}>
    //         <Link href={`/${item.id}`}>
    //           <img
    //             src={item.img}
    //             alt={item.myName}
    //             className="imageDisplayed"
    //           />
    //         </Link>
    //         <h3>{item.myName}</h3>
    //         <div></div>
    //       </div>
    //     );
    //   })}
    // </ul>
  );
}
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
export default HomePage;
