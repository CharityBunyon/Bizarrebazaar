﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizarreBazaar.DataAccess;
using BizarreBazaar.Models;
using Microsoft.AspNetCore.Mvc;


namespace BizarreBazaar.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepo _repository;

        public UserController(UserRepo repository)
        {
            _repository = repository;
        }

        
        //api/user
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repository.GetAll();

            return Ok(allUsers);
        }

        [HttpGet("userId/{uid}")]

        public IActionResult GetUserById(int uid)
        
        {
            var user = _repository.GetUserById(uid);
            if (user == null)
            {
                return NotFound("Sorry, this user does not exist.");
            }

            return Ok(user);
        }

        [HttpGet("username/{userName}")]
        public IActionResult GetByUserName(string userName)
        {
            var user = _repository.GetUserByUserName(userName);
            if (user == null)
            {
                return NotFound("Sorry, this username does not exist.");
            }

            return Ok(user);

        }

        [HttpPost]
        public IActionResult AddUser(User userToAdd)
        {
            var existingUser = _repository.GetUserByUserName(userToAdd.UserName);
            if (existingUser == null)
            {
                var newUser = _repository.Add(userToAdd);
                return Created("", newUser);
            }

            return Ok(existingUser);
        }

        [HttpPut("deleteAccount/{uid}")]
        public IActionResult DeleteAccountById(int uid)
        {
            var existingUser = _repository.GetUserById(uid);
            if (existingUser != null)
            {
                _repository.DeleteUserAccount(uid);
                return Ok($"User with the id of {uid} has been successfully deleted.");
            }

            return NotFound("Sorry, this user does not exist.");

        }

        [HttpGet("searchUser/{search}")]

        public IActionResult GetSearchedUsers(string search)
        {
            var searchedUser = _repository.GetSearchedUser(search);
            if (searchedUser == null)
            {
                return NotFound("Sorry but that user doesn't exist.");
            }

            return Ok(searchedUser);
        }

    }
}
