import {render,screen,cleanup} from "@testing-library/react";
import Button from "./button";
import renderer from "react-test-renderer";

afterEach(()=>{
    cleanup();
});

test("button",()=>{
    render(<Button buttontext="hello" takebuttontext={false} />);
    const button = screen.getByTestId("button");
    expect(button.innerHTML).toBe("hello hii");
});

test("button",()=>{
    render(<Button buttontext="hello1" takebuttontext={true}/>);
    const button = screen.getByTestId("button");
    expect(button.innerHTML).toBe("button hii");
});


test("snapshots",()=>{
    const tree = renderer.create(<Button buttontext="hello" takebuttontext={true}></Button>);
    expect(tree).toMatchSnapshot();
});