import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { Bid } from "../types/bid.type";
import History from "../pages/Dashboard/History";
import EmptyComponent from "./EmptyComponent";
import { useAddBookmarkMutation, useRemoveBookmarkMutation } from "../api";
import { getUser } from "../utils/helper";
import { toast } from "react-toastify";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
//   price: number,
// ) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: "2020-01-05",
//         customerId: "11091700",
//         amount: 3,
//       },
//       {
//         date: "2020-01-02",
//         customerId: "Anonymous",
//         amount: 1,
//       },
//     ],
//   };
// }

type Props = {
  row: Bid;
  handleBidClick: (bid: Bid) => void;
  handleUnauthorizeClick: () => void;
};

function Row(props: Props) {
  const user = getUser()
  const { row, handleBidClick, handleUnauthorizeClick } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(row.isBookmarked);
  const [addBookmark] = useAddBookmarkMutation()
  const [removeBookmark] = useRemoveBookmarkMutation()


  const handleBidDetails = (id: string) => {
    navigate(`/bid/${id}`);
  };

  const handleFavorite = async (id: string) => {
    if (user) {
      const params = {
        auctionId: id,
        userId: user._id
      }
      if (!isFavorite) {
        const resp = await addBookmark(params)
        if (resp.data) {
          setIsFavorite(true)
          toast.success('Bookmark added successfully')
        }
      } else {
        removeBookmark(params)
          .then(() => {
            setIsFavorite(false)
            toast.success('Bookmark removed successfully.')
          })
          .catch(() => toast.error('Something went wrong'))
      }
    } else {
      handleUnauthorizeClick()
    }
  }
  return (
    <React.Fragment>
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset", backgroud: "primary.main" } }}
      >
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Button sx={{ justifyContent: 'flex-start', padding: 0 }} onClick={() => handleBidDetails(row._id)} variant="text">
            {row.domainName}
          </Button>
        </StyledTableCell>
        <StyledTableCell align="right">{row.latestBid?.amount || row.startingPrice}</StyledTableCell>
        <StyledTableCell align="right">{row.bid}</StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
        <StyledTableCell align="right">{row.protein}</StyledTableCell> */}

        <StyledTableCell align="right">
          <Button onClick={() => handleFavorite(row._id)} variant="text">
            {!isFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          </Button>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Button onClick={() => handleBidClick(row)} variant="contained">
            Bid Now
          </Button>
        </StyledTableCell>
      </StyledTableRow>
      {open && (
        <History auctionId={row._id} open={open} />
      )}
    </React.Fragment>
  );
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type TableProps = {
  handlePlaceBid: (id: Bid) => void;
  auctionData: Bid[];
  handleUnauthorizeClick: () => void
};
export default function BaseTable({ handlePlaceBid, auctionData, handleUnauthorizeClick }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Domain</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Total Bid</StyledTableCell>
            <StyledTableCell align="right">Time Left</StyledTableCell>
            <StyledTableCell align="right">Add to favorite</StyledTableCell>
            <StyledTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            auctionData.length ?
              auctionData.map((row) => (
                <Row key={row._id} row={row} handleBidClick={handlePlaceBid} handleUnauthorizeClick={handleUnauthorizeClick} />
              ))
              : <td colSpan={7}><EmptyComponent> There is no auction available </EmptyComponent></td>

          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
