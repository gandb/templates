using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterControllerHandler : MonoBehaviour
{
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private float jumpForce = 5;
    [SerializeField] private float firstJumpHeight = 5;
    [SerializeField] private float secondJumpHeight = 5;
    [SerializeField] private float moveForce = 5; 

    private float mgravity => Physics.gravity.y;
    private Vector3 mvelocity = new Vector3();
    private CharacterController mCharacterController;
    private GameObject groundCheck;


    private const int NOT_STARTED = 0;
    private const int FIRST_JUMP_STARTED = 1;
    private const int FIRST_FALL = 2;
    private const int SECOND_JUMP_STARTED = 3;
    private const int SECOND_FALL = 4;
    private int mJumpState = NOT_STARTED;
    private float mStartPositionJump = 0f;
    private bool mEnabledSecondJump = false;



    public void Start()
    {


        mCharacterController = GetComponent<CharacterController>();
        mCharacterController.detectCollisions = true;

        Debug.Log("Hellow from Start");

        groundCheck = new GameObject("GroundCheck");
        groundCheck.transform.SetParent(transform);
        Collider colider = GetComponent<Collider>();

        Vector3 pos = colider.bounds.center;
        pos.y = colider.bounds.min.y;
        groundCheck.transform.position = pos;
    }

    public void Update()
    {
        MoveCharacter();
        ApplyGravity();

    }

    private void ApplyGravity()
    {
        mvelocity.y += mgravity * Time.deltaTime;
        mCharacterController.Move(mvelocity * Time.deltaTime);
        if (IsGrounded() && mvelocity.y < 0)
        {
            mvelocity.y = 0f;
        }
    }

    private void SolveJump()
    {

        if (Input.GetButton("Jump"))
        {

            switch (mJumpState)
            {
                case NOT_STARTED:
                    {
                        if (IsGrounded())
                        {
                            mStartPositionJump = this.transform.position.y;
                            mvelocity.y = Mathf.Sqrt(jumpForce * -2 * mgravity);
                            mJumpState = FIRST_JUMP_STARTED;
                        }

                        break;
                    }
                case FIRST_JUMP_STARTED:
                    {
                        if (this.transform.position.y >= (firstJumpHeight + mStartPositionJump))
                        {
                            mJumpState = FIRST_FALL;
                        }
                        else
                        {
                            mvelocity.y = Mathf.Sqrt(jumpForce * -2 * mgravity);
                        }
                        break;
                    }

                case SECOND_JUMP_STARTED:
                    {
                        if (this.transform.position.y > (mStartPositionJump + secondJumpHeight))
                        {
                            mJumpState = SECOND_FALL;
                        }
                        else
                        {
                            mvelocity.y = Mathf.Sqrt(jumpForce * -2 * mgravity);
                        }
                        break;
                    }
                case FIRST_FALL:
                    {
                        if (mEnabledSecondJump)
                        { 
                            mJumpState = SECOND_JUMP_STARTED;
                            mStartPositionJump = this.transform.position.y;
                            mvelocity.y = Mathf.Sqrt(jumpForce * -2 * mgravity);
                        }
                        break;
                    }


            }
        }
        else
        {
            if (IsGrounded())
            {
                mJumpState = NOT_STARTED;
                mEnabledSecondJump = false;
                return;
            }

            switch (mJumpState)
            {

                case FIRST_FALL:
                    {

                        mEnabledSecondJump = true;

                        break;
                    }
                case FIRST_JUMP_STARTED:
                    {
                        mJumpState = FIRST_FALL;
                        break;

                    }
            }
        }
    }


    private void MoveCharacter()
    {

        SolveJump();

        float horizontalAxis = Input.GetAxis("Horizontal");
        float verticalAxis = Input.GetAxis("Vertical"); 

        Vector3 move = new Vector3(horizontalAxis, 0, verticalAxis);

        mCharacterController.Move(move * Time.deltaTime * moveForce);

    }


    public bool IsGrounded()
    {
        return Physics.CheckSphere(groundCheck.transform.position, 0.1f, groundLayer);
    }

    void OnControllerColliderHit(ControllerColliderHit hit)
    {
        if (hit.transform.tag == "MoveObjects")
        {
            Debug.Log("teste");
            hit.transform.SendMessage("OnCollision", this.gameObject, SendMessageOptions.DontRequireReceiver);
        }
       
    }
}
