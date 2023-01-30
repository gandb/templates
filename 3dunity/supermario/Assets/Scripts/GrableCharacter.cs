using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GrableCharacter : MonoBehaviour
{
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag.Contains("Player"))
        {
            collision.gameObject.transform.parent = gameObject.transform;
        } 
    }

    void OnCollisionExit(Collision collision)
    {
        if (collision.gameObject.tag.Contains("Player"))
        {
            collision.gameObject.transform.parent = null;
        }
         
    }

    public void OnCollision(GameObject gameObject)
    {
        Debug.Log("collision" + gameObject.name);
    }
}
