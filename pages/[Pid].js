import fs from "fs/promises";
import path from "path";
import { Col, Card } from "antd";
import Link from "next/link";

import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
function ProductDeatil(props) {
  if (!props.loadedProducts) {
    return <p>Loading...!</p>;
  }
  return (
    <div className="dynamic_Content">
      <Col
        span={6}
        xs={24}
        sm={24}
        md={8}
        lg={8}
        xl={8}
        key={props.loadedProducts.id}
      >
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
                src={props.loadedProducts.img}
                style={{
                  width: "200px",
                  height: "600px",
                }}
              />
            </div>
          }
          actions={[
            <div className="container">
              <Link href={`/`}>
                <h3>Go back to homePage....!</h3>
              </Link>
            </div>,
          ]}
        >
          <h3
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "black",
            }}
          >
            {props.loadedProducts.myName}
          </h3>
          <div style={{ marginBottom: "10px" }}>
            <MailOutlined style={{ fontSize: "25px" }} />

            <span
              style={{
                margin: "10px",
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              {props.loadedProducts.email}
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <PhoneOutlined style={{ fontSize: "25px" }} />
            <span
              style={{
                margin: "10px",
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              {props.loadedProducts.phone}
            </span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <GlobalOutlined style={{ fontSize: "25px" }} />

            <span
              style={{
                margin: "10px",
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
              }}
            >
              {props.loadedProducts.website}
            </span>
          </div>
        </Card>
      </Col>
    </div>
  );
}

async function getdata() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}
export async function getStaticProps(context) {
  const { params } = context;
  const ProductID = params.Pid;
  const data = await getdata();
  const product = data.products.find((product) => product.id === ProductID);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProducts: product,
    },
  };
}
export async function getStaticPaths() {
  const data = await getdata();
  const ids = data.products.map((product) => product.id);
  const PathWithParams = ids.map((id) => ({ params: { Pid: id } }));
  return {
    paths: PathWithParams,
    fallback: "blocking",
  };
}
export default ProductDeatil;
