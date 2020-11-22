import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import MoveToTop from "../../components/MoveToTop";
import Md5Simulation from "./Md5Simulation";

import md5ProcessingImg from "./md5ProcessingFig.png";
// import mstImg from "./mst-fig.svg";
// import partialHamiltonianFig from "./partial-hamiltonian-fig.svg";
// import hamiltonianFig from "./hamiltonian-fig.svg";

const useStyles = makeStyles((theme) => ({
  titleBlock: {
    height: "40vh",
    background: "linear-gradient(-45deg, #FB7BA2, #FCE043)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: "60px",
    textAlign: "center",
    color: "#fff",
  },
  backButton: {
    position: "absolute",
    left: "40px",
    top: "40px",
    color: "#fff",
    border: "thin solid #fff",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    textAlign: "center",
    transition: "0.3s ease",

    "&:hover": {
      background: "#fff",
      color: "#FCE043", // second color of gradient
    },
  },
  body: {
    margin: "30px 10vw",
  },
  section: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  simulator: {
    // width: "80%",
    alignSelf: "center",
    background: "#F2F3F4",
    margin: "20px 0",
  },
  text: {
    margin: "10px 0",
  },
  importantText: {
    color: "red",
    fontWeight: "500",
  },
  importantParagraph: {
    padding: "10px",
    borderLeft: "5px solid #FCE043", // second color of gradient
    background: "#F2F3F4",
  },
  articleImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  articleImage: {
    maxHeight: "400px",
  },
  articleImageCaption: {
    fontSize: "13px",
    background: "#F2F3F4",
    padding: "2px",
  },
  syntaxBlock: {
    padding: "10px !important",
    borderLeft: "5px solid #20DED3", // second color of gradient
  },
  centerText: {
    display: "flex",
    justifyContent: "center",
  },
  monospaceText: {
    fontFamily: "'Lucida Console', monospace",
  },
}));

const CodeBlock = (props) => {
  const classes = useStyles();
  return (
    <SyntaxHighlighter
      language="javascript"
      style={docco}
      wrapLines={true}
      className={classes.syntaxBlock}
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

const H1 = (props) => {
  const classes = useStyles();
  return <h1 className={classes.heading}>{props.children}</h1>;
};

const H2 = (props) => {
  const classes = useStyles();
  return <h2 className={classes.heading}>{props.children}</h2>;
};

const H3 = (props) => {
  const classes = useStyles();
  return <h3 className={classes.heading}>{props.children}</h3>;
};

const Text = (props) => {
  const classes = useStyles();
  return <p className={classes.text}>{props.children}</p>;
};

const CenterText = (props) => {
  const classes = useStyles();
  return (
    <p className={`${classes.centerText} ${classes.text}`}>{props.children}</p>
  );
};

const MonospaceText = (props) => {
  const classes = useStyles();
  return <p className={classes.monospaceText}>{props.children}</p>;
};

const Mark = (props) => {
  const classes = useStyles();
  return <span className={classes.importantText}>{props.children}</span>;
};

const MarkPara = (props) => {
  const classes = useStyles();
  return (
    <div className={`${classes.importantParagraph} ${classes.text}`}>
      {props.children}
    </div>
  );
};

const ImgDiv = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.articleImageContainer}>
      <img
        src={props.src}
        className={classes.articleImage}
        style={props.maxHeight ? { maxHeight: props.maxHeight } : null}
      />
      {props.caption ? (
        <p className={classes.articleImageCaption}>{props.caption}</p>
      ) : null}
    </div>
  );
};

const ArticleComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <div className={classes.titleBlock} id="top-anchor">
        {/* <div className={classes.backButton}></div> */}
        <IconButton
          className={classes.backButton}
          onClick={() => history.push("/")}
        >
          <HomeIcon />
        </IconButton>

        <h1 className={classes.title}>MD5 Encryption</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.section}>
          <H1>Lets get your hands dirty</H1>
          <Text>
            This amazing tool can encrypt any piece of text to its equivalent
            MD5 hash. To start, you just need to write in the textbox.
            Encryption will be done magically, as soon as you type.
          </Text>
          <Md5Simulation className={classes.simulator} />
        </div>
        <div className={classes.section}>
          <H1>Aditya vs Hackers</H1>
          <Text>
            Aditya works as CEO for a software company that releases newer
            versions of their software frequently.
          </Text>
          <Text>
            Most of these files aren't in human-readable format and are binary
            files. But there are some notorious people who clone these files,
            change them, and introduce malware. Then they upload these corrupted
            files on a domain similar to that of the original and steal data
            from the individuals who download and use them. Thus, this is
            hampering the image of the company.
          </Text>
          <Text>
            Aditya wants to overcome the problem with a simple solution. He
            thinks and comes up with an idea of displaying MD5 hashes of the
            original software on the website. But how will this help him
            overcome the issue? Lets see.
          </Text>
          <H1>Cryptography</H1>
          <Text>
            Cryptography is a method of protecting information and
            communications through the use of codes, so that only those for whom
            the information is intended can read and process it. More generally,
            cryptography is about constructing and analyzing protocols that
            prevent third parties or the public from reading private messages;
            various aspects in information security such as data
            confidentiality, data integrity, authentication, and non-repudiation
            are central to modern cryptography.
          </Text>
          <H3>Encryption</H3>
          <Text>
            In cryptography, encryption is the process of encoding information.
            This process converts the original representation of the
            information, known as plaintext, into an alternative form known as
            ciphertext. Ideally, only authorized parties can decipher a
            ciphertext back to plaintext and access the original information
          </Text>
          <H3>Decryption</H3>
          <Text>
            The conversion of encrypted data into its original form is called
            Decryption. It is generally a reverse process of encryption. It
            decodes the encrypted information so that an authorized user can
            only decrypt the data because decryption requires a secret key or
            password.
          </Text>
          <H3>Hash Function</H3>
          <Text>
            A hash function is any function that can be used to map data of
            arbitrary size to fixed-size values. The values returned by a hash
            function are called hash values.
          </Text>
          <Text>
            The values are used to index a fixed-size table called a hash table.
            Use of a hash function to index a hash table is called hashing. A
            hash function takes an input as a key, which is associated with a
            datum or record and used to identify it to the data storage and
            retrieval application. The keys may be fixed length, like an
            integer, or variable length, like a name. The output is a hash code
            used to index a hash table holding the data or records, or pointers
            to them.
          </Text>
          <H1>MD5</H1>
          <Text>
            The MD5 hashing algorithm is a one-way cryptographic function that
            accepts a message of any length as input and returns as output a
            fixed-length digest value to be used for authenticating the original
            message.The output is generally 128 bit hash value. It can be used
            as a checksum to verify data integrity, but only against
            unintentional corruption.
          </Text>
          <H3>How does it work?</H3>
          <Text>
            MD5 takes in the input message and converts it into bits.The input
            message is broken up into chunks of 512-bit blocks (sixteen 32-bit
            words).The message is then padded to make it 448 % 512 bits long.The
            padding works as follows: first a single bit, 1, is appended to the
            end of the message. This is followed by as many zeros as are
            required to bring the length of the message up to 64 bits fewer than
            a multiple of 512. After that, a 64 bit value representing the
            original message is added.
          </Text>
          <Text>
            A 128 bit buffer is used to store the intermediate and final result
            of the hash function. The 128 bit buffer is implemented using 4
            registers of 32 bit each. The registers are initialised with the
            following values:
            <MarkPara>
              A = 1732584193 <br />
              B = -271733879 <br />
              C = -1732584194 <br />D = 271733878
            </MarkPara>
          </Text>
          <Text>
            We first define four auxiliary functions that each take as input
            three 32-bit words and produce as output one 32-bit word.
            <MarkPara>
              F(X, Y, Z) = XY v X'Z <br />
              G(X, Y, Z) = XZ v YZ' <br />
              H(X, Y, Z) = X xor Y xor Z <br />
              I(X, Y, Z) = Y xor (X v Z')
            </MarkPara>
          </Text>
          <Text>
            In each bit position F acts as a conditional: if X then Y else Z.
          </Text>
          <Text>
            The functions G, H, and I are similar to the function F, in that
            they act in "bitwise parallel" to produce their output from the bits
            of X, Y, and Z, in such a manner that if the corresponding bits of
            X, Y, and Z are independent and unbiased, then each bit of G(X, Y
            ,Z), H(X, Y, Z), and I(X, Y, Z) will be independent and unbiased.
            Note that the function H is the bitwise "xor" or "parity" function
            of its inputs.
          </Text>
          <Text>Now the message is passed in blocks of 512 bits.</Text>
          <ImgDiv
            src={md5ProcessingImg}
            caption={
              "MD5 processing of a single 512-bit block [MD5 compression function]"
            }
            maxHeight={"800px"}
          />
          <Text>
            After all the 512 bit chunks are processed, a 128 bit message digest
            is produced, which is a function of all the bits of the input
            message.
          </Text>
          <Text>
            To produce the MD5 digest, we just need to sum A, B, C and D and
            convert it to hexadecimal.
          </Text>
          <H1>Applications</H1>
          <Text>
            MD5 digests have been widely used in the software world to provide
            some assurance that a transferred file has arrived intact. For
            example, file servers often provide a pre-computed MD5 (known as
            md5sum) checksum for the files, so that a user can compare the
            checksum of the downloaded file to it. Most unix-based operating
            systems include MD5 sum utilities in their distribution packages.
          </Text>
          <MarkPara>
            There always exists a unique MD5 checksum for every file. Thus, if a
            file gets modified, MD5 checksum will change. Aditya knows about
            this concept, and hence he is displaying this unique MD5 checksum of
            the software on his website. This would help his clients to
            differentiate between original and corrupted files, and thus would
            save the image of his company.
          </MarkPara>
          <H1>Security issues</H1>
          <Text>
            As it is easy to generate MD5 collisions, it is possible for the
            person who created the file to create a second file with the same
            checksum, so this technique cannot protect against some forms of
            malicious tampering.
          </Text>
          <H3>Collision attack</H3>
          <Text>
            Find two different messages m1 and m2 such that{" "}
            <Mark>hash(m1) = hash(m2)</Mark>.
          </Text>
          <Text>
            An example MD5 collision, with the two messages differing in 6 bits,
            is:
          </Text>
          <MarkPara>
            <b>Message 1</b>
            <MonospaceText>
              d131dd02c5e6eec4 693d9a0698aff95c 2fcab5<Mark>8</Mark>712467eab
              4004583eb8fb7f89
              <br />
              55ad340609f4b302 83e4888325<Mark>7</Mark>1415a 085125e8f7cdc99f
              d91dbd<Mark>f</Mark>280373c5b
              <br />
              d8823e3156348f5b ae6dacd436c919c6 dd53e2<Mark>b</Mark>487da03fd
              02396306d248cda0
              <br />
              e99f33420f577ee8 ce54b67080<Mark>a</Mark>80d1e c69821bcb6a88393
              96f965<Mark>2</Mark>b6ff72a70
            </MonospaceText>
          </MarkPara>
          <MarkPara>
            <b>Message 2</b>
            <MonospaceText>
              d131dd02c5e6eec4 693d9a0698aff95c 2fcab5<Mark>0</Mark>712467eab
              4004583eb8fb7f89
              <br />
              55ad340609f4b302 83e4888325<Mark>f</Mark>1415a 085125e8f7cdc99f
              d91dbd<Mark>7</Mark>280373c5b
              <br />
              d8823e3156348f5b ae6dacd436c919c6 dd53e2<Mark>3</Mark>487da03fd
              02396306d248cda0
              <br />
              e99f33420f577ee8 ce54b67080<Mark>2</Mark>80d1e c69821bcb6a88393
              96f965<Mark>a</Mark>b6ff72a70
            </MonospaceText>
          </MarkPara>
          <Text>
            Both produce the MD5 hash{" "}
            <Mark>79054025255fb1a26e4bc422aef54eb4</Mark>. The difference
            between the two samples is that the leading bit in each nibble has
            been flipped. For example, the 20th byte (offset 0x13) in the top
            sample, 0x87, is 10000111 in binary. The leading bit in the byte
            (also the leading bit in the first nibble) is flipped to make
            00000111, which is 0x07, as shown in the lower sample.
          </Text>
          <Text>
            So if two prefixes with the same hash can be constructed, a common
            suffix can be added to both to make the collision more likely to be
            accepted as valid data by the application using it. Furthermore,
            current collision-finding techniques allow to specify an arbitrary
            prefix: an attacker can create two colliding files that both begin
            with the same content. All the attacker needs to generate two
            colliding files is a template file with a 128-byte block of data,
            aligned on a 64-byte boundary that can be changed freely by the
            collision-finding algorithm.
          </Text>
        </div>
      </div>
      <MoveToTop />
    </div>
  );
};

export default ArticleComponent;
