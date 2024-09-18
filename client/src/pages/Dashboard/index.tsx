import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import Navbar from "../Layout/Navbar";
// import BaseTable, { Bid } from "../../components/BaseTable";
import { ChangeEvent, useContext, useState } from "react";
import BidModal from "../../components/BidModal";
import BaseTable from "../../components/BaseTable";
import { Bid } from "../../types/bid.type";
import Dropdown from "../../components/Dropdown";
import { domainType } from "../../data";
import CreateAuction from "./CreateAuction";
import { useGetAuctionsQuery } from "../../api";
import { AuthContext } from "../../utils/AuthProvider";
import CustomModal from "../../components/CustomModal";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../utils/helper";

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = getUser()._id

  const [bidModal, setBidModal] = useState<boolean>();
  const [rowData, setRowData] = useState<Bid>();
  const [searchQuery, setSearchQuery] = useState("");
  const [signInModal, setSignInModal] = useState(false);
  const [domain, setDomain] = useState("")
  const { data: auctionData, isLoading, isFetching, error } = useGetAuctionsQuery({
    domainName: searchQuery,
    userId,
    user
  });

  const handlePlaceBid = (data: Bid) => {
    // console.log("handlePlaceBid", id);
    if (isAuthenticated) {
      setRowData(data);
      setBidModal(true);
    } else {
      setSignInModal(!signInModal)
    }
  };

  function handleSignInBtn() {
    navigate("/sign-in");
  }

  const handleSignInModal = () => {
    setSignInModal(!signInModal);
  };

  const handleConfirm = () => { };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleDomainType = (value: string | null) => {
    setSearchQuery(value || "")
    setDomain(value || "")
  }
  let err = error as any 
  err = err?.error
  return (
    <Layout>
      <>
        <Navbar />
        <Box
          sx={{
            marginTop: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ height: '70vh' }} >
            <Box display={"flex"} gap={".5rem"} mt={"3rem"} mb={"1rem"}>
              <TextField
                onChange={handleSearch}
                required
                fullWidth
                id="password"
                autoComplete="new-password"
                label="Auction Search"
                size="small"

              />
              <Dropdown value={domain} handleChange={handleDomainType} options={domainType} label="Domain Type" />
            </Box>
            {isLoading || isFetching ? (
              <Box display={'flex'} justifyContent={'center'}><CircularProgress /></Box>
            ) : err ? <Typography>{err}</Typography>
              :
              <BaseTable
                auctionData={auctionData || []}
                handlePlaceBid={handlePlaceBid}
                handleUnauthorizeClick={handleSignInModal}
              />
            }
          </Box>
        </Box>
        <CreateAuction handleSignInModal={handleSignInModal} />
        {bidModal && (
          <BidModal
            data={rowData}
            open={bidModal}
            handleClose={() => setBidModal(false)}
            handleConfirm={handleConfirm}
          />
        )}
        {signInModal && (
          <CustomModal
            open={signInModal}
            handleClose={handleSignInModal}
            primaryBtn="Go to Sign In"
            title="Need Sign In"
            handlePrimaryAction={handleSignInBtn}
          >
            {"Before taking any action need to do sign in first."}
          </CustomModal>
        )}
      </>
    </Layout>
  );
};

export default Dashboard;
