using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaypointerFollow : MonoBehaviour
{
    [SerializeField] private GameObject[] waypoints;
    [SerializeField] private float speed;
    [SerializeField] private float tolerance=0.1f;

     private int mIndex = 0;
  
    public virtual void Update()
    {
           if (Vector3.Distance(transform.position,waypoints[mIndex].transform.position) < tolerance)
        {
            mIndex++;
            mIndex = (mIndex >= waypoints.Length) ? 0 : mIndex;
        }
        transform.position = Vector3.MoveTowards(transform.position, waypoints[mIndex].transform.position, speed * Time.deltaTime);
      
    }
}
